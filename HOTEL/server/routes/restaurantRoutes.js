const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// GET all restaurants (with optional search)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { cuisine: { $regex: search, $options: 'i' } },
          { 'menu.name': { $regex: search, $options: 'i' } }
        ]
      };
    }
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a review
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const restaurantId = req.params.id;

    const review = new Review({
      restaurant: restaurantId,
      user: req.user.id,
      userName: req.user.username,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET reviews for a restaurant
router.get('/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurant: req.params.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
