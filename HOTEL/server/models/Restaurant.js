const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  isVeg: { type: Boolean, default: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cuisine: [String],
  rating: { type: Number, default: 0 },
  address: { type: String, required: true },
  deliveryTime: { type: Number, required: true }, // in minutes
  menu: [menuItemSchema]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
