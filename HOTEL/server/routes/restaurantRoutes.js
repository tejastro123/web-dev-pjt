const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const { validateReview } = require('../middleware/validation');

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
router.post('/:id/reviews', [auth, validateReview], async (req, res) => {
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

// Like/Unlike a Review
router.put('/reviews/:id/like', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ msg: 'Review not found' });

    // Check if already liked
    if (review.likes.includes(req.user.id)) {
      // Unlike
      review.likes = review.likes.filter(id => id.toString() !== req.user.id);
    } else {
      // Like
      review.likes.push(req.user.id);
    }

    await review.save();
    res.json(review.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
