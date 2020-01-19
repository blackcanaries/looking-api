"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Activity = require("../../models/activity");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let activity;

    try {
      activity = await Activity.findOne({ _id: req.params.id })
        .populate("activity", "-tracks")
        .exec();

      if (activity == null) {
        res.json({
          success: false,
          object: "activity",
          message: "Can't find activity."
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
      message: "Activity found.",
      data: activity
    });
  }
);

module.exports = router;
