const { validationResult, body, param, query } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation Error",
      details: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
};

const registerValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role")
    .optional()
    .isIn(["admin", "member", "staff", "organization"])
    .withMessage("Invalid role"),
  validate,
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

const bookingValidation = [
  body("spaceId").notEmpty().withMessage("Space ID is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("startTime").notEmpty().withMessage("Start time is required"),
  body("endTime").notEmpty().withMessage("End time is required"),
  validate,
];

const eventValidation = [
  body("title").trim().notEmpty().withMessage("Event title is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("startTime").notEmpty().withMessage("Start time is required"),
  body("endTime").notEmpty().withMessage("End time is required"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  validate,
];

const ticketValidation = [
  body("subject").trim().notEmpty().withMessage("Subject is required"),
  body("message").trim().notEmpty().withMessage("Message is required"),
  body("category")
    .optional()
    .isIn(["general", "billing", "booking", "technical", "feedback", "maintenance", "other"]),
  validate,
];

const idParamValidation = [
  param("id").isMongoId().withMessage("Invalid ID format"),
  validate,
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  bookingValidation,
  eventValidation,
  ticketValidation,
  idParamValidation,
};
