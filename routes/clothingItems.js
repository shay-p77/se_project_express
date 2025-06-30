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

const { validateCardBody, validateId } = require('../middlewares/validation');

// Public route
router.get('/', getItems);

// Protected routes
router.post('/', auth, validateCardBody, createItem);
router.delete('/:itemId', auth, validateId, deleteItem);
router.put('/:itemId/likes', auth, validateId, likeItem);
router.delete('/:itemId/likes', auth, validateId, unlikeItem);

module.exports = router;
