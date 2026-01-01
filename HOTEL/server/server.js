const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const MONGODB_URI = 'mongodb://127.0.0.1:27017/zomato_clone'; // Use local for now

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Zomato Clone API is running');
});

// Import Routes (Placeholder)
// const restaurantRoutes = require('./routes/restaurants');
// app.use('/api/restaurants', restaurantRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
