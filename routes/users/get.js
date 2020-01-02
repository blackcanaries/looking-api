"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getUser } = require("../../helpers/middleware");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;

    res.json({
      success: true,
      object: "user",
      message: "Authentication successful. User found.",
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
);

module.exports = router;
