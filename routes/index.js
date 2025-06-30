const express = require('express');

const router = express.Router();

const { login, createUser } = require('../controllers/users');
const userRoutes = require('./users');
const itemRoutes = require('./clothingItems');

const {
  validateUserSignup,
  validateUserLogin,
} = require('../middlewares/validation');

// Public routes
router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserSignup, createUser);

// Protected routes
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;
