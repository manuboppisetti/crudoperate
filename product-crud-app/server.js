// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express(); // Initialize the app

// Middleware setup
app.use(cors());  // Allow cross-origin requests from the frontend
app.use(express.json());  // Middleware to parse incoming JSON requests

// Routes setup
app.use('/api/products', productRoutes);  // Handle product-related requests

// MongoDB connection
mongoose.connect('mongodb://boppisettimanasa:creation@cluster0.xvi0v.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
