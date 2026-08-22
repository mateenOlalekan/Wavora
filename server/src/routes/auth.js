const express = require("express");
const router = express.Router();
const { register, login, logout, refreshToken, getMe, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const { registerValidation, loginValidation, validate } = require("../middleware/validate");

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh", refreshToken);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

module.exports = router;
