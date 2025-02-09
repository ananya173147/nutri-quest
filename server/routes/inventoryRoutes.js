const express = require("express");
const Inventory = require("../models/Inventory"); // Import the Challenge model

const router = express.Router();

// **GET /api/inventory** - Fetch all challenges
router.get("/", async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json({ inventories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventories" });
  }
});

/*
// **POST /api/inventory/
router.post("/", async (req, res) => {
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
*/
module.exports = router;