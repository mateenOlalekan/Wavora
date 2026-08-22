const User = require("../models/User");
const Booking = require("../models/Booking");
const Space = require("../models/Space");
const Payment = require("../models/Payment");
const SupportTicket = require("../models/SupportTicket");

/**
 * Get admin dashboard overview stats
 * GET /api/admin/overview
 */
exports.getOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalSpaces = await Space.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayBookings = await Booking.countDocuments({
      date: { $gte: today },
    });

    const openTickets = await SupportTicket.countDocuments({ status: "open" });

    // Revenue (current month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyPayments = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalUsers,
      totalBookings,
      totalSpaces,
      todayBookings,
      openTickets,
      monthlyRevenue: monthlyPayments[0]?.total || 0,
    });
  } catch (error) {
    next(error);
  }
};

// ─── User Management ──────────────────────────────────────

exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(filter);

    res.json({ users, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, phone, isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role, phone, isActive },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user, message: "User updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

// ─── Booking Management ────────────────────────────────────

exports.getBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (date) filter.date = { $gte: new Date(date) };

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

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ booking, message: "Booking status updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    next(error);
  }
};

// ─── Space Management ──────────────────────────────────────

exports.getSpaces = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    const filter = {};
    if (type) filter.type = type;

    const spaces = await Space.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Space.countDocuments(filter);

    res.json({ spaces, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.createSpace = async (req, res, next) => {
  try {
    const space = await Space.create(req.body);
    res.status(201).json({ space, message: "Space created" });
  } catch (error) {
    next(error);
  }
};

exports.updateSpace = async (req, res, next) => {
  try {
    const space = await Space.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!space) return res.status(404).json({ error: "Space not found" });
    res.json({ space, message: "Space updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteSpace = async (req, res, next) => {
  try {
    const space = await Space.findByIdAndDelete(req.params.id);
    if (!space) return res.status(404).json({ error: "Space not found" });
    res.json({ message: "Space deleted" });
  } catch (error) {
    next(error);
  }
};

// ─── Payment Management ────────────────────────────────────

exports.getPayments = async (req, res, next) => {
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

exports.getRevenue = async (req, res, next) => {
  try {
    const { period = "month" } = req.query;
    let startDate = new Date();

    if (period === "month") {
      startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    } else if (period === "year") {
      startDate = new Date(startDate.getFullYear(), 0, 1);
    } else if (period === "week") {
      startDate.setDate(startDate.getDate() - 7);
    }

    const revenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const totalRevenue = await Payment.aggregate([
      { $match: { status: "completed", createdAt: { $gte: startDate } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      daily: revenue,
      total: totalRevenue[0]?.total || 0,
      period,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Support Tickets ───────────────────────────────────────

exports.getTickets = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tickets = await SupportTicket.find(filter)
      .populate("user", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await SupportTicket.countDocuments(filter);

    res.json({ tickets, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const { status, assignedTo } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status, assignedTo },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ ticket, message: "Ticket updated" });
  } catch (error) {
    next(error);
  }
};

exports.resolveTicket = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status: "resolved", resolvedAt: new Date() },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json({ ticket, message: "Ticket resolved" });
  } catch (error) {
    next(error);
  }
};
