const User = require("../models/User");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Space = require("../models/Space");

/**
 * Get organization dashboard overview
 * GET /api/organization/overview
 */
exports.getOverview = async (req, res, next) => {
  try {
    const totalMembers = await User.countDocuments({ role: { $in: ["member", "staff"] } });
    const totalSpaces = await Space.countDocuments();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthBookings = await Booking.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const monthRevenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const recentBookings = await Booking.find()
      .populate("user", "firstName lastName")
      .populate("space", "name type")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalMembers,
      totalSpaces,
      monthBookings,
      monthRevenue: monthRevenue[0]?.total || 0,
      recentBookings,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Members Management ────────────────────────────────────

exports.getMembers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const filter = { role: { $ne: "admin" } };
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const members = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(filter);

    res.json({ members, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { role, isActive } = req.body;
    const member = await User.findByIdAndUpdate(
      req.params.id,
      { role, isActive },
      { new: true }
    );
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json({ member, message: "Member updated" });
  } catch (error) {
    next(error);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.json({ message: "Member removed" });
  } catch (error) {
    next(error);
  }
};

// ─── Bookings Management ───────────────────────────────────

exports.getBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, startDate, endDate } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const bookings = await Booking.find(filter)
      .populate("user", "firstName lastName email")
      .populate("space", "name type")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Booking.countDocuments(filter);

    res.json({ bookings, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.getBookingAnalytics = async (req, res, next) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const bookingsByStatus = await Booking.aggregate([
      {
        $match: { createdAt: { $gte: startOfMonth } },
      },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const bookingsBySpace = await Booking.aggregate([
      {
        $match: { createdAt: { $gte: startOfMonth } },
      },
      {
        $lookup: {
          from: "spaces",
          localField: "space",
          foreignField: "_id",
          as: "spaceInfo",
        },
      },
      { $unwind: "$spaceInfo" },
      { $group: { _id: "$spaceInfo.name", count: { $sum: 1 } } },
    ]);

    res.json({ bookingsByStatus, bookingsBySpace });
  } catch (error) {
    next(error);
  }
};

// ─── Analytics ─────────────────────────────────────────────

exports.getAnalytics = async (req, res, next) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const revenueByMonth = await Payment.aggregate([
      {
        $match: { status: "completed", createdAt: { $gte: startOfMonth } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const revenueByPlan = await Payment.aggregate([
      {
        $match: { status: "completed", createdAt: { $gte: startOfMonth } },
      },
      {
        $lookup: {
          from: "memberships",
          localField: "user",
          foreignField: "user",
          as: "membershipInfo",
        },
      },
      { $unwind: { path: "$membershipInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$membershipInfo.plan",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenueByMonth.reduce((sum, day) => sum + day.total, 0);
    const totalBookings = await Booking.countDocuments({ createdAt: { $gte: startOfMonth } });
    const totalMembers = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

    res.json({
      revenueByMonth,
      revenueByPlan,
      totalRevenue,
      totalBookings,
      totalMembers,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Billing ───────────────────────────────────────────────

exports.getBilling = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const payments = await Payment.find(filter)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Payment.countDocuments(filter);

    res.json({ payments, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.generateInvoice = async (req, res, next) => {
  try {
    const { userId, amount, description } = req.body;
    const payment = await Payment.create({
      user: userId,
      amount,
      description,
      status: "pending",
      type: "invoice",
    });
    res.status(201).json({ payment, message: "Invoice generated" });
  } catch (error) {
    next(error);
  }
};

// ─── Team Management ───────────────────────────────────────

exports.getTeam = async (req, res, next) => {
  try {
    const team = await User.find({ role: "staff" })
      .select("firstName lastName email phone avatar role isActive createdAt");
    res.json({ team });
  } catch (error) {
    next(error);
  }
};

exports.addTeamMember = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const member = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      role: "staff",
      password: "temp1234",
    });
    res.status(201).json({ member, message: "Team member added" });
  } catch (error) {
    next(error);
  }
};

exports.removeTeamMember = async (req, res, next) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: "Team member not found" });
    res.json({ message: "Team member removed" });
  } catch (error) {
    next(error);
  }
};
