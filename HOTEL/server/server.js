const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const prompt = "Please configure your .env file with MONGODB_URI";
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zomato-clone';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes Blueprint
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/', (req, res) => {
  res.send('Zomato Clone API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
