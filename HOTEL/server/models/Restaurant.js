const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  isVeg: { type: Boolean, default: true },
  category: { type: String } // e.g., "Starters", "Main Course"
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL or path
  cuisine: { type: String, required: true }, // e.g., "North Indian, Chinese"
  rating: { type: Number, default: 0 },
  deliveryTime: { type: String }, // e.g., "30-40 mins"
  costForTwo: { type: Number }, // e.g., 500
  features: [{ type: String }],
  photos: [{ type: String }],
  menuImages: [{ type: String }],
  menu: [foodItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
