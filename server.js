"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Authentication files
const passport = require("passport");
require("./config/passport")(passport);

// Connect to the database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to database"));

// Configure API server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// User route
app.use("/users/signup", require("./routes/users/signup"));
app.use("/users/confirm", require("./routes/users/confirm"));
app.use("/users/login", require("./routes/users/login"));
app.use("/users/me", require("./routes/users/get"));
app.use("/users/me", require("./routes/users/patch"));
app.use("/users/me", require("./routes/users/delete"));

// Achievement route
app.use("/achievements", require("./routes/achievements"));

// Course route
app.use("/courses", require("./routes/courses/post"));
app.use("/courses", require("./routes/courses/get"));
app.use("/courses", require("./routes/courses/get_all"));
app.use("/courses", require("./routes/courses/patch"));
app.use("/courses", require("./routes/courses/delete"));

// Track route
app.use("/tracks", require("./routes/tracks"));

// Start API server
app.listen(3000, () => console.log("Server started"));
