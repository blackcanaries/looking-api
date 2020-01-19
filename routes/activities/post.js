"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Activity = require("../../models/activity");

// Create a activity
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { activity, description, type } = req.body;

    const newActivity = new Activity({
      activity,
      description,
      type,
      user_id: req.user._id
    });

    try {
      await newActivity.save();

      res.json({
        success: true,
        object: "activity",
        message: "Activity was successfully created.",
        data: newActivity
      });
    } catch (err) {
      res.json({
        success: false,
        object: "activity",
        message: err.message
      });
    }
  }
);

module.exports = router;
