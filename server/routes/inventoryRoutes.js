const express = require('express');
const Inventory = require('../models/Inventory'); // Import the Challenge model

const router = express.Router();

// **GET /api/inventory** - Fetch all challenges
router.get('/', async (req, res) => {
  try {
    const inventories = await Inventory.find();
    res.json({ inventories });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventories' });
  }
});

// **POST /api/inventory** - Add a new inventory item
router.post('/', async (req, res) => {
  try {
    const {
      name,
      expiryDate,
      quantity,
      sustainabilityScore,
      nutritionScore,
      category,
      calories,
      ingredients,
      status,
      nutritionFacts,
    } = req.body; // Extract data from request body

    // Create a new inventory document
    const newInventory = new Inventory({
      name,
      expiryDate,
      quantity,
      sustainabilityScore,
      nutritionScore,
      category,
      calories,
      ingredients,
      status,
      nutritionFacts,
    });

    // Save the document to the database
    const savedInventory = await newInventory.save();

    res.status(201).json({ success: true, inventory: savedInventory });
  } catch (error) {
    console.error('Error adding inventory:', error);
    res.status(500).json({ success: false, error: 'Failed to add inventory' });
  }
});

module.exports = router;

// **DELETE /api/inventory/:id** - Delete an inventory item by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the inventory item exists
    const inventoryItem = await Inventory.findById(id);
    if (!inventoryItem) {
      return res
        .status(404)
        .json({ success: false, error: 'Inventory item not found' });
    }

    // Delete the inventory item
    await Inventory.findByIdAndDelete(id);

    res.json({ success: true, message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error deleting inventory:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to delete inventory item' });
  }
});
