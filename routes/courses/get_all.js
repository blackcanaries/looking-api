"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

router.get("/", async (req, res) => {
  let courses;

  try {
    courses = await Course.find({}, { tracks: 0 });
    if (courses.length < 1) {
      res.json({
        success: false,
        object: "course",
        message: "Can't find any courses."
      });
    }
  } catch (err) {
    res.json({
      success: false,
      object: "course",
      message: err.message
    });
  }

  res.json({
    success: true,
    object: "course",
    message: `${courses.length} Courses found.`,
    data: courses
  });
});

module.exports = router;
