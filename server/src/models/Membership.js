const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["basic", "standard", "premium", "enterprise"],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "trial", "paused", "cancelled", "expired"],
      default: "active",
    },
    monthlyPrice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    nextBillingDate: {
      type: Date,
    },
    features: [
      {
        name: String,
        included: { type: Boolean, default: true },
        limit: Number,
        used: { type: Number, default: 0 },
      },
    ],
    perks: [
      {
        type: String,
      },
    ],
    autoRenew: {
      type: Boolean,
      default: true,
    },
    cancellationReason: {
      type: String,
    },
    cancelledAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

membershipSchema.index({ user: 1 });
membershipSchema.index({ status: 1, nextBillingDate: 1 });

module.exports = mongoose.model("Membership", membershipSchema);
