const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Seed Restaurants (Temporary endpoint for dev)
router.post('/seed', async (req, res) => {
  try {
    await Restaurant.deleteMany({});

    const seedData = [
      {
        name: "Tasty Bytes",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop",
        cuisine: ["Italian", "Pizza"],
        rating: 4.5,
        address: "123 Tech Street",
        deliveryTime: 30,
        menu: [
          { name: "Margherita Pizza", price: 12.99, description: "Classic tomato and cheese", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500", isVeg: true },
          { name: "Pepperoni Pizza", price: 14.99, description: "Spicy pepperoni", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500", isVeg: false }
        ]
      },
      {
        name: "Burger King Clone",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop",
        cuisine: ["American", "Burgers"],
        rating: 4.2,
        address: "456 Burger Ave",
        deliveryTime: 25,
        menu: [
          { name: "Cheeseburger", price: 8.99, description: "Juicy beef patty with cheese", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", isVeg: false },
          { name: "Veggie Burger", price: 9.99, description: "Plant-based goodness", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500", isVeg: true }
        ]
      },
      {
        name: "Sushi World",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop",
        cuisine: ["Japanese", "Sushi"],
        rating: 4.8,
        address: "789 Ocean Drive",
        deliveryTime: 40,
        menu: [
          { name: "California Roll", price: 6.99, description: "Crab, avocado, cucumber", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd43ea?w=500", isVeg: false },
          { name: "Salmon Nigiri", price: 5.99, description: "Fresh salmon on rice", image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500", isVeg: false }
        ]
      }
    ];

    const createdRestaurants = await Restaurant.insertMany(seedData);
    res.json(createdRestaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
