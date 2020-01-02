"use strict";

const express = require("express");
const router = express.Router();
const { getUser } = require("../../helpers/middleware");

// Confirm a user
router.patch("/", getUser, async (req, res) => {
  const { activation_code } = req.body;

  if (!activation_code) {
    res.json({
      success: false,
      object: "user",
      message: "You must provide a activation code"
    });
  } else if (activation_code !== res.user.activation_code) {
    res.json({
      success: false,
      object: "user",
      message:
        "We couldn't match the email address and activation code you provided."
    });
  } else {
    res.user.status = "active";

    try {
      await res.user.save();

      res.json({
        success: true,
        object: "user",
        message: "Your account has been activated"
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

module.exports = router;
