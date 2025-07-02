const ClothingItem = require('../models/clothingItem');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');

// get all items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      next(new ServerError('An error has occurred on the server.'));
    });
};

// create item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('Invalid data passed for creating item.')
        );
      }
      return next(new ServerError('An error has occurred on the server.'));
    });
};

// delete item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError('Item not found');
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('You are not authorized to delete this item.');
      }

      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};

// like item
const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Item not found');
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};

// unlike item
const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError('Item not found');
    })
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid item ID'));
      }
      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
