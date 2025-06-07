const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { NOT_FOUND } = require('./utils/errors');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const userRoutes = require('./routes/users');
const itemRoutes = require('./routes/clothingItems');

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.post('/signin', login);
app.post('/signup', createUser);
app.get('/items', itemRoutes);

// Auth middleware for everything below this line
app.use(auth);

// Protected routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes); // POST, DELETE only (not GET!)

// Temporary user for test environments
if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    req.user = { _id: '5d8b8592978f8bd833ca8133' };
    next();
  });
}

//  Error handling middleware
app.use((err, req, res) => {
  console.error(err);
  return res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'An error occurred on the server.' });
});

//  404 fallback
app.use((req, res) => res.status(NOT_FOUND).send({ message: 'Requested resource not found' }));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
