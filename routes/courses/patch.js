"use strict";

const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

router.patch("/:id", async (req, res) => {
  Course.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, data) => {
      if (err) {
        res.json({
          success: false,
          object: "course",
          message: err.message
        });
      } else if (!data) {
        res.json({
          success: false,
          object: "course",
          message: "Course could not be found."
        });
      } else {
        res.json({
          success: true,
          object: "course",
          message: "Course has been updated.",
          data
        });
      }
    }
  );
});

module.exports = router;
