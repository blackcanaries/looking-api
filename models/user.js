"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helper = require("../helpers/codes");

// Construct Track schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    type: { type: String, default: "free" },
    avatar: { type: String },
    activation_code: { type: String },
    reset_code: { type: String },
    status: { type: String, default: "inactive" },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

userSchema.pre("save", function(next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });

      user.activation_code = helper.generateCode();
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(pass, cb) {
  bcrypt.compare(pass, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
