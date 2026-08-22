const express = require("express");
const router = express.Router();
const {
  getOverview,
  getMembers,
  updateMember,
  removeMember,
  getBookings,
  getBookingAnalytics,
  getAnalytics,
  getBilling,
  generateInvoice,
  getTeam,
  addTeamMember,
  removeTeamMember,
} = require("../controllers/organizationController");
const { protect, authorize } = require("../middleware/auth");

// All organization routes require auth + admin role (org admins)
router.use(protect, authorize("admin"));

// Dashboard
router.get("/overview", getOverview);

// Members
router.get("/members", getMembers);
router.put("/members/:id", updateMember);
router.delete("/members/:id", removeMember);

// Bookings
router.get("/bookings", getBookings);
router.get("/bookings/analytics", getBookingAnalytics);

// Analytics
router.get("/analytics", getAnalytics);

// Billing
router.get("/billing", getBilling);
router.post("/billing/invoice", generateInvoice);

// Team
router.get("/team", getTeam);
router.post("/team", addTeamMember);
router.delete("/team/:id", removeTeamMember);

module.exports = router;
