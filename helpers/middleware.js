"use strict";

const User = require("../models/user");

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.json({
        success: false,
        object: "user",
        message: "Can't find user."
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      object: "user",
      message: err.message
    });
  }

  res.user = user;
  next();
}

exports.getUser = getUser;
