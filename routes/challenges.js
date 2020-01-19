"use strict";

const express = require("express");
const router = express.Router();
const Challenge = require("../models/challenge");

// Create a challenge
router.post("/", async (req, res) => {
  const challenge = new Challenge({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const newChallenge = await challenge.save();
    res.json({
      success: true,
      object: "challenge",
      message: "Challenge was successfully created.",
      data: newChallenge
    });
  } catch (err) {
    res.json({
      success: false,
      object: "challenge",
      message: err.message
    });
  }
});

// Get all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json({
      success: true,
      object: "challenge",
      message: `${challenges.length} Challenges found.`,
      data: challenges
    });
  } catch (err) {
    res.json({
      success: false,
      object: "challenge",
      message: err.message
    });
  }
});

// Get a challenge
router.get("/:id", getChallenge, (req, res) => {
  res.json({
    success: true,
    object: "challenge",
    message: "Challenge found.",
    data: res.challenge
  });
});

// Update a challenge
router.patch("/:id", getChallenge, async (req, res) => {
  if (req.body.title != null) {
    res.challenge.title = req.body.title;
  }

  if (req.body.description != null) {
    res.challenge.description = req.body.description;
  }

  try {
    const updatedChallenge = await res.challenge.save();
    res.json({
      success: true,
      object: "challenge",
      message: "Challenge has been updated.",
      data: updatedChallenge
    });
  } catch (err) {
    res.json({
      success: false,
      object: "challenge",
      message: err.message
    });
  }
});

// Delete a challenge
router.delete("/:id", getChallenge, async (req, res) => {
  try {
    await res.challenge.remove();
    res.json({
      success: true,
      object: "challenge",
      message: "Challenge was successfully deleted."
    });
  } catch (err) {
    res.json({
      success: false,
      object: "challenge",
      message: err.message
    });
  }
});

// Middleware to get single challenge by id
async function getChallenge(req, res, next) {
  let challenge;

  try {
    challenge = await Challenge.findOne({ _id: req.params.id });
    if (challenge == null) {
      return res.json({
        success: false,
        object: "challenge",
        message: "Cant find challenge."
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      object: "challenge",
      message: err.message
    });
  }

  res.challenge = challenge;
  next();
}

module.exports = router;
