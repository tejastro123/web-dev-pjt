const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/Restaurant').schema.path('menu').schema; // or just raw objects
require('dotenv').config();

const sampleRestaurants = [
  {
    name: "Spicy Treats",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop",
    cuisine: "North Indian, Chinese",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    costForTwo: 500,
    menu: [
      { name: "Paneer Butter Masala", price: 250, description: "Rich creamy gravy", image: "https://source.unsplash.com/200x200/?paneer", isVeg: true, category: "Main Course" },
      { name: "Chicken Biryani", price: 300, description: "Aromatic basmati rice", image: "https://source.unsplash.com/200x200/?biryani", isVeg: false, category: "Main Course" }
    ]
  },
  {
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop",
    cuisine: "American, Fast Food",
    rating: 4.2,
    deliveryTime: "25-35 mins",
    costForTwo: 350,
    menu: [
      { name: "Whopper", price: 199, description: "Flame grilled patty", image: "https://source.unsplash.com/200x200/?burger", isVeg: false, category: "Burgers" },
      { name: "Fries", price: 99, description: "Crispy salted fries", image: "https://source.unsplash.com/200x200/?fries", isVeg: true, category: "Sides" }
    ]
  },
  {
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    cuisine: "Italian, Pizza",
    rating: 4.0,
    deliveryTime: "40-50 mins",
    costForTwo: 600,
    menu: [
      { name: "Margherita", price: 299, description: "Classic cheese pizza", image: "https://source.unsplash.com/200x200/?pizza", isVeg: true, category: "Pizzas" },
      { name: "Pepperoni", price: 399, description: "Spicy pepperoni", image: "https://source.unsplash.com/200x200/?pepperoni", isVeg: false, category: "Pizzas" }
    ]
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zomato-clone')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');
    await Restaurant.deleteMany({});
    console.log('Cleared existing restaurants');
    await Restaurant.insertMany(sampleRestaurants);
    console.log('Seeded restaurants');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
