const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const userRoutes = require('./users');
const itemRoutes = require('./clothingItems');

// Public routes
router.post('/signin', login);
router.post('/signup', createUser);

// Protected routes
router.use('/users', auth, userRoutes);
router.use('/items', auth, itemRoutes);

module.exports = router;
