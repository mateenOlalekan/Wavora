const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["networking", "workshop", "wellness", "community", "social", "other"],
      default: "community",
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    registered: {
      type: Number,
      default: 0,
    },
    attendees: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        registeredAt: { type: Date, default: Date.now },
        attended: { type: Boolean, default: false },
      },
    ],
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published", "upcoming", "ongoing", "completed", "cancelled"],
      default: "draft",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model("Event", eventSchema);
