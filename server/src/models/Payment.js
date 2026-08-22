const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    type: {
      type: String,
      enum: ["membership", "booking", "event", "extra-hours", "guest-pass", "late-fee", "refund"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["credit-card", "debit-card", "bank-transfer", "cash", "online"],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    invoiceNumber: {
      type: String,
      unique: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membership",
    },
    metadata: {
      type: Map,
      of: String,
    },
    paidAt: {
      type: Date,
    },
    refundedAt: {
      type: Date,
    },
    refundReason: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

paymentSchema.pre("save", function (next) {
  if (!this.invoiceNumber) {
    this.invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  }
  next();
});

paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
