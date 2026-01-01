const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// POST create order (Public or Private depending on guest logic)
router.post('/', async (req, res) => {
  try {
    const { userAddress, restaurant, items, totalAmount, userName, userId } = req.body;
    // Note: userId can be passed from frontend if we want to associate, 
    // or we can use auth middleare if we enforce login. 
    // For now, let's allow optionally passing user ID or saving as guest.

    const newOrder = new Order({
      user: userId || null, // If userId is sent
      userName,
      userAddress,
      restaurant,
      items,
      totalAmount,
      status: 'Placed'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET user's orders
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('restaurant', 'name image address') // Populate restaurant details
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL orders (Admin style, keeping for dev)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
