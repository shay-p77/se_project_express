const express = require('express');
const router = express.Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem
} = require('../controllers/clothingItems');

// Remove extra /items prefix — it's added in app.js
router.get('/', getItems);
router.post('/', createItem);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', unlikeItem);

module.exports = router;
