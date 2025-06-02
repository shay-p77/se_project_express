const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
} = require('../controllers/users');

// No need to include /users here — it's already prefixed in app.js
router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
