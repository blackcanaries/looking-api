"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/user");

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { activation_code, reset_token, password, created } = req.body;

    if (activation_code || reset_token || password || created) {
      res.json({
        success: false,
        object: "user",
        message: "You can't update all these values."
      });
    } else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true },
        (err, user) => {
          if (err) {
            res.json({
              success: false,
              object: "user",
              message: err.message
            });
          } else if (!user) {
            res.json({
              success: false,
              object: "user",
              message: "User could not be found."
            });
          } else {
            res.json({
              success: true,
              object: "user",
              message: "User has been updated.",
              data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                type: user.type,
                avatar: user.avatar,
                status: user.status,
                created: user.created,
                updated: user.updated
              }
            });
          }
        }
      );
    }
  }
);

module.exports = router;
