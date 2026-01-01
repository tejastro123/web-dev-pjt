const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  places: {
    type: Number, // Display count locally for MVP, or array of refs in real app
    default: 0
  },
  url: {
    type: String // For routing potentially
  }
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
