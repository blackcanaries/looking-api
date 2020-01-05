"use strict";

const express = require("express");
const router = express.Router();
const Track = require("../models/track");

// Get all tracks
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json({
      success: true,
      object: "track",
      message: `${tracks.length} Tracks found.`,
      data: tracks
    });
  } catch (err) {
    res.json({
      success: false,
      object: "track",
      message: err.message
    });
  }
});

// Get a track
router.get("/:id", getTrack, (req, res) => {
  res.json({
    success: true,
    object: "track",
    message: "Track found.",
    data: res.track
  });
});

// Create a track
router.post("/", async (req, res) => {
  const track = new Track({
    title: req.body.title,
    duration: req.body.duration,
    url: req.body.url,
    author: req.body.author
  });

  try {
    const newTrack = await track.save();
    res.json({
      success: true,
      object: "track",
      message: "Track was successfully created.",
      data: newTrack
    });
  } catch (err) {
    res.json({
      success: false,
      object: "track",
      message: err.message
    });
  }
});

// Update a track
router.patch("/:id", getTrack, async (req, res) => {
  if (req.body.title != null) {
    res.track.title = req.body.title;
  }

  if (req.body.duration != null) {
    res.track.duration = req.body.duration;
  }

  if (req.body.url != null) {
    res.track.url = req.body.url;
  }

  if (req.body.author != null) {
    res.track.author = req.body.author;
  }

  try {
    const updatedTrack = await res.track.save();
    res.json({
      success: true,
      object: "track",
      message: "Track has been updated.",
      data: updatedTrack
    });
  } catch (err) {
    res.json({
      success: false,
      object: "track",
      message: err.message
    });
  }
});

// Delete a track
router.delete("/:id", getTrack, async (req, res) => {
  try {
    await res.track.remove();
    res.json({
      success: true,
      object: "track",
      message: "Track was successfully deleted."
    });
  } catch (err) {
    res.json({
      success: false,
      object: "track",
      message: err.message
    });
  }
});

// Middleware to get single track by id
async function getTrack(req, res, next) {
  let track;

  try {
    track = await Track.findOne({ _id: req.params.id });
    if (track == null) {
      return res.json({
        success: false,
        object: "track",
        message: "Cant find track."
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      object: "track",
      message: err.message
    });
  }

  res.track = track;
  next();
}

module.exports = router;
