const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional if guest checkout
  userName: { type: String }, // For guest
  userAddress: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      foodItem: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to subdocument ID if possible, or just store data
      name: String,
      price: Number,
      quantity: { type: Number, required: true, default: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'], default: 'Placed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
