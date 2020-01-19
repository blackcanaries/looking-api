"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

router.delete("/:id", async (req, res) => {
  let course;

  try {
    course = await Course.findOne({ _id: req.params.id });
    if (course) {
      course.remove();

      res.json({
        success: true,
        object: "course",
        message: "Course was successfully deleted."
      });
    } else {
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
});

module.exports = router;
