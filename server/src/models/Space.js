const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Space name is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["hot-desk", "dedicated-desk", "private-office", "meeting-room", "event-space", "media-studio"],
      required: [true, "Space type is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: 1,
    },
    amenities: [
      {
        type: String,
        trim: true,
      },
    ],
    hourlyRate: {
      type: Number,
      min: 0,
    },
    dailyRate: {
      type: Number,
      min: 0,
    },
    monthlyRate: {
      type: Number,
      min: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    floorPlan: {
      type: String,
    },
    zone: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    operatingHours: {
      open: { type: String, default: "06:00" },
      close: { type: String, default: "23:00" },
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

spaceSchema.index({ type: 1, location: 1 });
spaceSchema.index({ isActive: 1 });

module.exports = mongoose.model("Space", spaceSchema);
