const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const { getCurrentUser, updateUser } = require('../controllers/users');

// Protected routes
router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, updateUser);

module.exports = router;
