"use strict";

const mongoose = require("mongoose");

// Construct Achievement schema
const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Achievement", achievementSchema);
