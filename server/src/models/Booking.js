const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    space: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      required: [true, "Space is required"],
    },
    date: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
    },
    duration: {
      type: Number, // in hours
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "checked-in", "completed", "cancelled", "no-show"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "failed"],
      default: "pending",
    },
    guests: [
      {
        name: String,
        email: String,
        checkedIn: { type: Boolean, default: false },
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
    checkedInAt: {
      type: Date,
    },
    checkedOutAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    bookingReference: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// Generate booking reference before saving
bookingSchema.pre("save", function (next) {
  if (!this.bookingReference) {
    this.bookingReference = `BK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  next();
});

bookingSchema.index({ user: 1, date: 1 });
bookingSchema.index({ space: 1, date: 1, startTime: 1, endTime: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingReference: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
