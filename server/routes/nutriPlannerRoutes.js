const express = require("express");
const Inventory = require("../models/Inventory");

const router = express.Router();

// GET /api/nutriplanner - Fetch purchased products
router.get("/", async (req, res) => {
  try {
    const purchasedProducts = await Inventory.find({ status: "purchased" });
    res.json({ purchasedProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch purchased products" });
  }
});

module.exports = router;
