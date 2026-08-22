const express = require("express");
const router = express.Router();
const {
  getOverview,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getSpaces,
  createSpace,
  updateSpace,
  deleteSpace,
  getPayments,
  getRevenue,
  getTickets,
  updateTicket,
  resolveTicket,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// All admin routes require auth + admin role
router.use(protect, authorize("admin"));

// Dashboard
router.get("/overview", getOverview);

// User management
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Booking management
router.get("/bookings", getBookings);
router.put("/bookings/:id/status", updateBookingStatus);
router.delete("/bookings/:id", deleteBooking);

// Space management
router.get("/spaces", getSpaces);
router.post("/spaces", createSpace);
router.put("/spaces/:id", updateSpace);
router.delete("/spaces/:id", deleteSpace);

// Payment management
router.get("/payments", getPayments);
router.get("/revenue", getRevenue);

// Support tickets
router.get("/tickets", getTickets);
router.put("/tickets/:id", updateTicket);
router.put("/tickets/:id/resolve", resolveTicket);

module.exports = router;
