const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { NOT_FOUND } = require('./utils/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());

app.use(express.json());

// Import routes
const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/clothingItems');

// Public routes
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/items', itemRoutes); // public GET

// Protect all routes below
app.use(auth);

// Protected routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes); // POST, DELETE protected

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send({ message: err.message || 'An error occurred on the server.' });
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the WTWR backend!');
});

// 404 handler for non-existent routes
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
