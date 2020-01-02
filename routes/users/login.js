"use strict";

require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getUser } = require("../../helpers/middleware");

// Create a user
router.post("/", getUser, async (req, res) => {
  const { password } = req.body;
  const user = res.user;

  user.comparePassword(password, function(err, isMatch) {
    if (isMatch && !err) {
      // if user is found and password is correct create a token
      let payload = { id: user._id };
      let token = jwt.sign(payload, process.env.SECRET_KEY);

      res.json({
        success: true,
        object: "user",
        message: "Login successful",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          type: user.type,
          avatar: user.avatar,
          status: user.status,
          created: user.created,
          updated: user.updated,
          token
        }
      });
    } else {
      res.json({
        success: false,
        object: "user",
        message: "Password does not match this account"
      });
    }
  });
});

module.exports = router;
