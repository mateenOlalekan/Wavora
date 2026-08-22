const Booking = require("../models/Booking");
const Membership = require("../models/Membership");
const Event = require("../models/Event");
const User = require("../models/User");
const SupportTicket = require("../models/SupportTicket");

/**
 * Get member dashboard overview
 * GET /api/member/overview
 */
exports.getOverview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const membership = await Membership.findOne({ user: userId, status: "active" });
    const upcomingBookings = await Booking.find({
      user: userId,
      date: { $gte: new Date() },
    })
      .populate("space", "name type")
      .sort({ date: 1 })
      .limit(5);

    const recentEvents = await Event.find({
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .limit(5);

    res.json({
      membership,
      upcomingBookings,
      recentEvents,
    });
  } catch (error) {
    next(error);
  }
};

// ─── Bookings ──────────────────────────────────────────────

exports.getBookings = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate("space", "name type price")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Booking.countDocuments(filter);

    res.json({ bookings, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const { spaceId, date, startTime, endTime, notes } = req.body;
    const booking = await Booking.create({
      user: req.user.id,
      space: spaceId,
      date,
      startTime,
      endTime,
      notes,
    });
    res.status(201).json({ booking, message: "Booking created" });
  } catch (error) {
    next(error);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (booking.status === "cancelled") {
      return res.status(400).json({ error: "Booking already cancelled" });
    }

    // Check cancellation policy (24h before)
    const bookingDate = new Date(booking.date);
    bookingDate.setHours(bookingDate.getHours() - 24);
    if (new Date() > bookingDate) {
      return res.status(400).json({ error: "Cannot cancel within 24 hours of booking" });
    }

    booking.status = "cancelled";
    await booking.save();
    res.json({ booking, message: "Booking cancelled" });
  } catch (error) {
    next(error);
  }
};

// ─── Membership ────────────────────────────────────────────

exports.getMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findOne({ user: req.user.id, status: "active" });
    res.json({ membership });
  } catch (error) {
    next(error);
  }
};

exports.upgradeMembership = async (req, res, next) => {
  try {
    const { plan } = req.body;
    const membership = await Membership.findOne({ user: req.user.id, status: "active" });
    if (membership) {
      membership.plan = plan;
      membership.startDate = new Date();
      membership.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await membership.save();
      return res.json({ membership, message: "Membership upgraded" });
    }
    const newMembership = await Membership.create({
      user: req.user.id,
      plan,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active",
    });
    res.status(201).json({ membership: newMembership, message: "Membership created" });
  } catch (error) {
    next(error);
  }
};

exports.cancelMembership = async (req, res, next) => {
  try {
    const membership = await Membership.findOne({ user: req.user.id, status: "active" });
    if (!membership) return res.status(404).json({ error: "No active membership found" });
    membership.status = "cancelled";
    await membership.save();
    res.json({ message: "Membership cancelled" });
  } catch (error) {
    next(error);
  }
};

// ─── Events ────────────────────────────────────────────────

exports.getEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Event.countDocuments({ date: { $gte: new Date() } });

    res.json({ events, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

exports.rsvpEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const alreadyRegistered = event.attendees.includes(req.user.id);
    if (alreadyRegistered) {
      return res.status(400).json({ error: "Already registered" });
    }
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    event.attendees.push(req.user.id);
    await event.save();
    res.json({ event, message: "Registered for event" });
  } catch (error) {
    next(error);
  }
};

exports.cancelRsvp = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.attendees = event.attendees.filter(
      (id) => id.toString() !== req.user.id
    );
    await event.save();
    res.json({ event, message: "RSVP cancelled" });
  } catch (error) {
    next(error);
  }
};

// ─── Community ─────────────────────────────────────────────

exports.getMembers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const filter = { _id: { $ne: req.user.id } };
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ];
    }
    const members = await User.find(filter)
      .select("firstName lastName avatar role")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments(filter);

    res.json({ members, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    next(error);
  }
};

// ─── Help / Support ────────────────────────────────────────

exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

exports.createTicket = async (req, res, next) => {
  try {
    const { subject, description, category, priority } = req.body;
    const ticket = await SupportTicket.create({
      user: req.user.id,
      subject,
      description,
      category,
      priority,
    });
    res.status(201).json({ ticket, message: "Support ticket created" });
  } catch (error) {
    next(error);
  }
};
