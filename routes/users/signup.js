"use strict";

const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const validator = require("validator");

// Create a user
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.json({
      success: false,
      object: "user",
      message: "Full name, email address and password are required."
    });
  } else if (!validator.isEmail(req.body.email)) {
    res.json({
      success: false,
      object: "user",
      message: "Email address is not valid"
    });
  } else if (!validator.isLength(req.body.name, { min: 6, max: undefined })) {
    res.json({
      success: false,
      object: "user",
      message: "Full name must be more than 6 character"
    });
  } else if (
    !validator.isLength(req.body.password, { min: 6, max: undefined })
  ) {
    res.json({
      success: false,
      object: "user",
      message: "Password should be more than 6 characters"
    });
  } else {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    try {
      await user.save();

      res.json({
        success: true,
        object: "user",
        message: "Your account was successfully created."
      });
    } catch (err) {
      res.json({
        success: false,
        object: "user",
        message: err.message
      });
    }
  }
});

module.exports = router;
