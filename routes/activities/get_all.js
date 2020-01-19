"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Activity = require("../../models/activity");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let activities;

    try {
      activities = await Activity.find({ user_id: req.user._id })
        .populate("activity", "-tracks")
        .exec();

      if (activities.length < 1) {
        res.json({
          success: false,
          object: "activity",
          message: "Can't find any activities."
        });
      }
    } catch (err) {
      res.json({
        success: false,
        object: "activity",
        message: err.message
      });
    }

    res.json({
      success: true,
      object: "activity",
      message: `${activities.length} Courses found.`,
      data: activities
    });
  }
);

module.exports = router;
