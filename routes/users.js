const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const { getCurrentUser, updateUser } = require('../controllers/users');

const { validateUserUpdate } = require('../middlewares/validation');

// protected routes
router.get('/me', auth, getCurrentUser);

router.patch('/me', auth, validateUserUpdate, updateUser);

module.exports = router;
