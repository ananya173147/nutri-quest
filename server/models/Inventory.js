const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name is a string
  expiryDate: { type: Date, required: true }, // Expiry date should be stored as a Date object
  quantity: { type: Number, required: true }, // Quantity is a number
  sustainabilityScore: { type: Number }, // Sustainability score is a number
  nutritionScore: { type: Number }, // Nutrition score is a number
  category: { type: String }, // Category is a string
  calories: { type: Number }, // Calories should be stored as a number
  ingredients: { type: String }, // Ingredients are stored as a single string
  status: { type: String }, // Status is a string
  nutritionFacts: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Stores an object with flexible key-value pairs
    required: true,
  },
});

module.exports = mongoose.model('Inventory', InventorySchema, 'Inventories');
