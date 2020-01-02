"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../../models/user");

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let user;

    try {
      user = await User.findOne({ _id: req.user._id });
      if (user) {
        user.remove();

        res.json({
          success: true,
          object: "user",
          message: "Your account was successfully deleted."
        });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
