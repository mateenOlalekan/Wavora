const express = require("express");
const router = express.Router();
const {
  getOverview,
  getBookings,
  createBooking,
  cancelBooking,
  getMembership,
  upgradeMembership,
  cancelMembership,
  getEvents,
  rsvpEvent,
  cancelRsvp,
  getMembers,
  getTickets,
  createTicket,
} = require("../controllers/memberController");
const { protect, authorize } = require("../middleware/auth");

// All member routes require auth + member role
router.use(protect, authorize("member"));

// Dashboard
router.get("/overview", getOverview);

// Bookings
router.get("/bookings", getBookings);
router.post("/bookings", createBooking);
router.put("/bookings/:id/cancel", cancelBooking);

// Membership
router.get("/membership", getMembership);
router.put("/membership/upgrade", upgradeMembership);
router.put("/membership/cancel", cancelMembership);

// Events
router.get("/events", getEvents);
router.post("/events/:id/rsvp", rsvpEvent);
router.post("/events/:id/cancel-rsvp", cancelRsvp);

// Community
router.get("/community/members", getMembers);

// Help
router.get("/help/tickets", getTickets);
router.post("/help/tickets", createTicket);

module.exports = router;
