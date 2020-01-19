"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

router.get("/:id", async (req, res) => {
  let course;

  try {
    course = await Course.findOne({ _id: req.params.id })
      .populate("tracks")
      .exec();
    if (course == null) {
      res.json({
        success: false,
        object: "course",
        message: "Can't find course."
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
    message: "Course found.",
    data: course
  });
});

module.exports = router;
