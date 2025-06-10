const express = require('express');

const router = express.Router();

const { login, createUser } = require('../controllers/users');
const userRoutes = require('./users');
const itemRoutes = require('./clothingItems');

// Public routes
router.post('/signin', login);
router.post('/signup', createUser);

// Protected routes
router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.exports = router;
