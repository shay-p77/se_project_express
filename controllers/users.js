const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
} = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(SERVER_ERROR)
//         .send({ message: 'An error has occurred on the server.' });
//     });
// };

// const getUser = (req, res) => {
//   const { userId } = req.params;
//   return User.findById(userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(NOT_FOUND).send({ message: 'User not found' });
//       }
//       return res.send(user);
//     })
//     .catch((err) => {
//       console.error(err);
//       if (err.name === 'CastError') {
//         return res
//           .status(BAD_REQUEST)
//           .send({ message: 'Invalid user ID format' });
//       }
//       return res
//         .status(SERVER_ERROR)
//         .send({ message: 'An error has occurred on the server.' });
//     });
// };

const SALT_ROUNDS = 10;

const createUser = (req, res) => {
  const {
    name, avatar, email, password,
  } = req.body;

  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).send({ message: 'Missing required fields' });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(CONFLICT)
          .send({ message: 'User with this email already exists' });
      }

      return bcrypt
        .hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name,
          avatar,
          email,
          password: hash,
        }))
        .then((user) => {
          const {
            _id,
            name: userName,
            avatar: userAvatar,
            email: userEmail,
          } = user;
          return res.status(201).send({
            _id,
            name: userName,
            avatar: userAvatar,
            email: userEmail,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({ message: 'Invalid data for creating user' });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: 'Email and password are required' });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err.message === 'Incorrect email or password') {
        return res.status(UNAUTHORIZED).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res
          .status(BAD_REQUEST)
          .send({ message: 'Invalid user ID format' });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({ message: 'Invalid data for updating user' });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: 'An error has occurred on the server.' });
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
