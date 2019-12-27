"use strict";

const express = require("express");
const router = express.Router();
const Track = require("../models/track");

// Get all tracks
router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a track
router.get("/:id", getTrack, (req, res) => {
  res.json(res.track);
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
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
    res.json(updatedTrack);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a track
router.delete("/:id", getTrack, async (req, res) => {
  try {
    await res.track.remove();
    res.json({ message: "Deleted Track" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get single track by id
async function getTrack(req, res, next) {
  let track;

  try {
    track = await Track.findOne({ _id: req.params.id });
    if (track == null) {
      return res.status(404).json({ message: "Cant find track" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.track = track;
  next();
}

module.exports = router;
