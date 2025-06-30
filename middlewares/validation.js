const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// 1. Validate clothing item creation
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
    'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'The "imageUrl" field must be a valid URL',
    }),
    weather: Joi.string().valid('hot', 'warm', 'cold').required().messages({
      'any.only': 'The "weather" field must be one of: hot, warm, cold',
      'string.empty': 'The "weather" field must be filled in',
    }),
  }),
});

// 2. Validate user signup
const validateUserSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "avatar" field must be filled in',
      'string.uri': 'The "avatar" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email',
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

// 3. Validate user login
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.email': 'The "email" field must be a valid email',
      'string.empty': 'The "email" field must be filled in',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'The "password" field must be filled in',
    }),
  }),
});

// 4. Validate itemId in route params
const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      'string.length': 'ID must be 24 characters',
      'string.hex': 'ID must be a valid hex string',
      'any.required': 'ID is required',
    }),
  }),
});

// 5. Validate user update (name and avatar)
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.min': 'The minimum length of the "name" field is 2',
      'string.max': 'The maximum length of the "name" field is 30',
      'string.empty': 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "avatar" field must be filled in',
      'string.uri': 'The "avatar" field must be a valid URL',
    }),
  }),
});

// Export all validators
module.exports = {
  validateURL,
  validateCardBody,
  validateUserSignup,
  validateUserLogin,
  validateId,
  validateUserUpdate,
};
