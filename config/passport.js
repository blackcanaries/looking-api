"use strict";

require("dotenv").config();

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

module.exports = function(passport) {
  let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
  };

  let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findOne({ _id: jwt_payload.id }, function(err, user) {
      if (err) {
        return next(err, false);
      }

      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    });
  });

  passport.use(strategy);
};
