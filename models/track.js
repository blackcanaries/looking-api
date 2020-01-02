"use strict";

const mongoose = require("mongoose");

// Construct Track schema
const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    url: { type: String, required: true },
    author: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Track", trackSchema);
