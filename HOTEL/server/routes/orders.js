const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order
router.post('/', async (req, res) => {
  try {
    const { user, restaurant, items, totalAmount } = req.body;

    const newOrder = new Order({
      user, // ID or Name string
      restaurant,
      items, // Array of { menuItemId, name, price, quantity }
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get User Orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('restaurant');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
