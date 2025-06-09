const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/clothingItems');

// Public route
router.get('/', getItems);

// Protected routes
router.post('/', auth, createItem);
router.delete('/:itemId', auth, deleteItem);
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, unlikeItem);

module.exports = router;
