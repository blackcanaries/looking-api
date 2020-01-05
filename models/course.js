"use strict";

const mongoose = require("mongoose");

// Construct Track schema
const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    type: { type: String },
    tracks: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Track"
        }
      ],
      validate: [
        arrayLimit,
        "A course must have at least 1 track associated with it"
      ]
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model("Course", courseSchema);
