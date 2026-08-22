const Booking = require("../models/Booking");
const User = require("../models/User");
const SupportTicket = require("../models/SupportTicket");

/**
 * Get staff dashboard overview
 * GET /api/staff/overview
 */
exports.getOverview = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCheckins = await Booking.countDocuments({
      date: { $gte: today, $lt: tomorrow },
      status: "confirmed",
    });

    const openMaintenance = await SupportTicket.countDocuments({
      category: "maintenance",
      status: "open",
    });

    const upcomingBookings = await Booking.find({
      date: { $gte: today, $lt: tomorrow },
    })
      .populate("user", "firstName lastName")
      .populate("space", "name type")
      .sort({ startTime: 1 })
      .limit(10);

    const pendingCheckins = await Booking.find({
      date: { $gte: today, $lt: tomorrow },
      status: "confirmed",
      checkedIn: false,
    })
      .populate("user", "firstName lastName")
      .populate("space", "name")
      .limit(10);

    res.json({
      todayCheckins,
      openMaintenance,
      upcomingBookings,
      pendingCheckins,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Check-in Management ───────────────────────────────────

exports.checkInUser = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.checkedIn = true;
    booking.checkInTime = new Date();
    booking.status = "checked-in";
    await booking.save();

    res.json({ booking, message: "User checked in" });
  } catch (error) {
    next(error);
  }
};

exports.checkOutUser = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.checkedOut = true;
    booking.checkOutTime = new Date();
    booking.status = "completed";
    await booking.save();

    res.json({ booking, message: "User checked out" });
  } catch (error) {
    next(error);
  }
};

exports.walkIn = async (req, res, next) => {
  try {
    const { userId, spaceId, startTime, endTime } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const booking = await Booking.create({
      user: userId,
      space: spaceId,
      date: new Date(),
      startTime,
      endTime,
      status: "checked-in",
      checkedIn: true,
      checkInTime: new Date(),
      type: "walk-in",
    });

    res.status(201).json({ booking, message: "Walk-in recorded" });
  } catch (error) {
    next(error);
  }
};

exports.getTodayCheckins = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const bookings = await Booking.find({
      date: { $gte: today, $lt: tomorrow },
    })
      .populate("user", "firstName lastName email phone")
      .populate("space", "name type")
      .sort({ startTime: 1 });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ─── Bookings Management ───────────────────────────────────

exports.getBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = {};
    if (status) filter.status = status;

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

// ─── Maintenance ───────────────────────────────────────────

exports.getMaintenanceRequests = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = { category: "maintenance" };
    if (status) filter.status = status;

    const tickets = await SupportTicket.find(filter)
      .populate("user", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await SupportTicket.countDocuments(filter);

    res.json({ tickets, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.updateMaintenanceRequest = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      {
        status,
        $push: { staffNotes: { note: notes, addedBy: req.user.id } },
      },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Request not found" });
    res.json({ ticket, message: "Maintenance request updated" });
  } catch (error) {
    next(error);
  }
};

exports.completeMaintenance = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id,
      { status: "resolved", resolvedAt: new Date() },
      { new: true }
    );
    if (!ticket) return res.status(404).json({ error: "Request not found" });
    res.json({ ticket, message: "Maintenance completed" });
  } catch (error) {
    next(error);
  }
};

// ─── Events ────────────────────────────────────────────────

exports.manageEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const Event = require("../models/Event");
    const events = await Event.find()
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Event.countDocuments();
    res.json({ events, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};
