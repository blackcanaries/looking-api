"use strict";

const mongoose = require("mongoose");

// Construct Challenge schema
const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Challenge", challengeSchema);
