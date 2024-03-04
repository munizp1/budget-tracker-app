// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // MongoDB library
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route for GET request
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Budget Tracker app.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
