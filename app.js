const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/clothingItems');

app.use((req, res, next) => {
  req.user = {
    _id: '683e279e08a8713b9237c7b8',
  };
  next();
});

// Use routes

app.use('/users', userRoutes);
app.use('/items', itemRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the WTWR backend!');
});

// 404 handler for non-existent routes
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
