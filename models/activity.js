"use strict";

const mongoose = require("mongoose");

// Construct Track schema
const activitySchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ["Achievement", "Challenge", "Course", "Track"],
      required: true
    },
    activity: {
      type: String,
      refPath: "type",
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Activity", activitySchema);
