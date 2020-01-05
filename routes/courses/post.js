"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

// Create a course
router.post("/", async (req, res) => {
  const { title, duration, type, tracks } = req.body;

  const tracksArray = tracks.split(", ");

  const course = new Course({
    title,
    duration,
    type,
    tracks: tracksArray
  });

  try {
    await course.save();

    res.json({
      success: true,
      object: "course",
      message: "Course was successfully created.",
      data: course
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
