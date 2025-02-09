const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
    {
      _id: Number, // Explicitly setting _id as Number since your data has it as 1
      name: String,
      expiryDate: String,
      quantity: Number,
      sustainabilityScore: Number,
      nutritionScore: Number,
      category: String,
      calories: String,
      ingredients: String,
      status: String,
      nutritionFacts: String
    } // Ensure it queries the existing Inventory collection
  );

module.exports = mongoose.model("Inventory", InventorySchema, "Inventories");