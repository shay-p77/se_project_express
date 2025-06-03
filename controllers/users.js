const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid user ID format' });
      }
      return res.status(SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid data for creating user' });
      }
      return res.status(SERVER_ERROR).send({ message: 'An error has occurred on the server.' });
    });
};

module.exports = { getUsers, getUser, createUser };
