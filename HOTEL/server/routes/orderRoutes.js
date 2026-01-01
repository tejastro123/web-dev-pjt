const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST create order
router.post('/', async (req, res) => {
  try {
    const { userAddress, restaurant, items, totalAmount, userName } = req.body;

    const newOrder = new Order({
      userAddress,
      restaurant,
      items,
      totalAmount,
      userName,
      status: 'Placed'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET orders (optional, for verification or user history)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
