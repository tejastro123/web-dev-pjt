const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const Collection = require('./models/Collection');
require('dotenv').config();

const sampleRestaurants = [
  {
    name: "Spicy Treats",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop",
    cuisine: "North Indian, Chinese",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    costForTwo: 500,
    features: ["Delivery", "Dining Out", "Pure Veg"],
    photos: [
      "https://b.zmtcdn.com/data/pictures/chains/1/50471/6a92ed20197b1029c2014b2161c77841.jpg",
      "https://b.zmtcdn.com/data/pictures/chains/1/50471/9b179e397621c1f727409c73335e2373.jpg"
    ],
    menuImages: [
      "https://b.zmtcdn.com/data/menus/471/50471/8724aa0b23088219602c18096a603c4f.jpg",
      "https://b.zmtcdn.com/data/menus/471/50471/7d355034375b47a92237d42cfb4718cd.jpg"
    ],
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
    features: ["Delivery", "Fast Food"],
    photos: ["https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000&auto=format&fit=crop"],
    menuImages: [],
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
    features: ["Delivery", "Dining Out", "Italian"],
    photos: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop"],
    menuImages: [],
    menu: [
      { name: "Margherita", price: 299, description: "Classic cheese pizza", image: "https://source.unsplash.com/200x200/?pizza", isVeg: true, category: "Pizzas" },
      { name: "Pepperoni", price: 399, description: "Spicy pepperoni", image: "https://source.unsplash.com/200x200/?pepperoni", isVeg: false, category: "Pizzas" }
    ]
  },
  {
    name: "Social",
    image: "https://b.zmtcdn.com/data/pictures/chains/3/18629393/03a01091bc22757d59772cba891d4e0e.jpg",
    cuisine: "Continental, American, Asian",
    rating: 4.6,
    deliveryTime: "40-50 mins",
    costForTwo: 1400,
    features: ["Dining Out", "Nightlife", "Alcohol"],
    menu: [
      { name: "Nachos", price: 350, description: "Loaded nachos", image: "https://source.unsplash.com/200x200/?nachos", isVeg: true, category: "Finger Food" },
      { name: "Cocktail", price: 450, description: "Signature Gin & Tonic", image: "https://source.unsplash.com/200x200/?cocktail", isVeg: true, category: "Drinks" }
    ]
  }
];

const seedCollections = [
  {
    title: "Trending This Week",
    description: "Most popular restaurants in town this week",
    image: "https://b.zmtcdn.com/data/collections/2b9361aa328a43b08986f77bbec2fe83_1674825998.jpg",
    places: 30
  },
  {
    title: "Best of Mumbai",
    description: "The city's best restaurants",
    image: "https://b.zmtcdn.com/data/collections/a1bafc59f9aa67998b9f8de61cac375f_1611601287.jpg",
    places: 58
  },
  {
    title: "Romantic Dining",
    description: "Perfect spots for a date night",
    image: "https://b.zmtcdn.com/data/collections/aaccefebb37320b3294371458e0a2d25_1682662095.jpg",
    places: 12
  },
  {
    title: "Work Friendly Places",
    description: "Cafes with wifi and good coffee",
    image: "https://b.zmtcdn.com/data/collections/85da8a1fb7956ba481358db31190bc8b_1688046351.jpg",
    places: 24
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zomato-clone')
  .then(async () => {
    console.log('Connected to MongoDB for seeding');

    await Restaurant.deleteMany({});
    await Collection.deleteMany({});
    console.log('Cleared existing data');

    await Restaurant.insertMany(sampleRestaurants);
    await Collection.insertMany(seedCollections);

    console.log('Seeded restaurants and collections');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
