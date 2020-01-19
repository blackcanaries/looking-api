"use strict";

const express = require("express");
const router = express.Router();
const Achievement = require("../models/achievement");

// Create a achievement
router.post("/", async (req, res) => {
  const achievement = new Achievement({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type
  });

  try {
    const newAchievement = await achievement.save();
    res.json({
      success: true,
      object: "achievement",
      message: "Achievement was successfully created.",
      data: newAchievement
    });
  } catch (err) {
    res.json({
      success: false,
      object: "achievement",
      message: err.message
    });
  }
});

// Get all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json({
      success: true,
      object: "achievement",
      message: `${achievements.length} Achievements found.`,
      data: achievements
    });
  } catch (err) {
    res.json({
      success: false,
      object: "achievement",
      message: err.message
    });
  }
});

// Get a achievement
router.get("/:id", getAchievement, (req, res) => {
  res.json({
    success: true,
    object: "achievement",
    message: "Achievement found.",
    data: res.achievement
  });
});

// Update a achievement
router.patch("/:id", getAchievement, async (req, res) => {
  if (req.body.title != null) {
    res.achievement.title = req.body.title;
  }

  if (req.body.description != null) {
    res.achievement.description = req.body.description;
  }

  if (req.body.type != null) {
    res.achievement.type = req.body.type;
  }

  try {
    const updatedAchievement = await res.achievement.save();
    res.json({
      success: true,
      object: "achievement",
      message: "Achievement has been updated.",
      data: updatedAchievement
    });
  } catch (err) {
    res.json({
      success: false,
      object: "achievement",
      message: err.message
    });
  }
});

// Delete a achievement
router.delete("/:id", getAchievement, async (req, res) => {
  try {
    await res.achievement.remove();
    res.json({
      success: true,
      object: "achievement",
      message: "Achievement was successfully deleted."
    });
  } catch (err) {
    res.json({
      success: false,
      object: "achievement",
      message: err.message
    });
  }
});

// Middleware to get single achievement by id
async function getAchievement(req, res, next) {
  let achievement;

  try {
    achievement = await Achievement.findOne({ _id: req.params.id });
    if (achievement == null) {
      return res.json({
        success: false,
        object: "achievement",
        message: "Cant find achievement."
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      object: "achievement",
      message: err.message
    });
  }

  res.achievement = achievement;
  next();
}

module.exports = router;
