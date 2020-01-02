"use strict";

const express = require("express");
const User = require("../models/user");

async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res.status(404).json({ message: "Cant find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

exports.getUser = getUser;
