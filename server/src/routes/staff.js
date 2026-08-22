const express = require("express");
const router = express.Router();
const {
  getOverview,
  checkInUser,
  checkOutUser,
  walkIn,
  getTodayCheckins,
  getBookings,
  getMaintenanceRequests,
  updateMaintenanceRequest,
  completeMaintenance,
  manageEvents,
} = require("../controllers/staffController");
const { protect, authorize } = require("../middleware/auth");

// All staff routes require auth + staff role
router.use(protect, authorize("staff"));

// Dashboard
router.get("/overview", getOverview);

// Check-in desk
router.get("/checkin/today", getTodayCheckins);
router.post("/checkin", checkInUser);
router.post("/checkout", checkOutUser);
router.post("/checkin/walk-in", walkIn);

// Bookings
router.get("/bookings", getBookings);

// Maintenance
router.get("/maintenance", getMaintenanceRequests);
router.put("/maintenance/:id", updateMaintenanceRequest);
router.put("/maintenance/:id/complete", completeMaintenance);

// Events
router.get("/events", manageEvents);

module.exports = router;
