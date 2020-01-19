"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Activity = require("../../models/activity");

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let activity;

    try {
      activity = await Activity.findOne({
        _id: req.params.id,
        user_id: req.user._id
      });
      if (activity) {
        activity.remove();

        res.json({
          success: true,
          object: "activity",
          message: "Activity was successfully deleted."
        });
      } else {
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
  }
);

module.exports = router;
