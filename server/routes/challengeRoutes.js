const express = require("express");
const Challenge = require("../models/Challenge"); // Import the Challenge model

const router = express.Router();

// **GET /api/challenges** - Fetch all challenges
router.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json({ challenges });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

// **POST /api/challenges/:id/complete** - Mark a challenge as completed
router.post("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found" });
    }

    res.json({ success: true, points: challenge.points });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to complete challenge" });
  }
});

module.exports = router;