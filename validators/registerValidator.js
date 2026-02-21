const { body } = require('express-validator');
const { isEmailTaken, isUsernameTaken } = require('../db/queries/userQueries');

const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 40 })
    .withMessage(
      'Username must be at least 3 characters long and no more than 40 characters long.'
    )
    .custom(async (username) => {
      const exists = await isUsernameTaken(username);
      if (exists) {
        throw new Error('Username is already taken');
      }
      return true;
    }),
  body('full_name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3, max: 40 })
    .withMessage(
      'Full name must be at least 3 characters long and no more than 40 characters long.'
    ),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email) => {
      const exists = await isEmailTaken(email);
      if (exists) {
        throw new Error('Email is already taken');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

module.exports = registerValidator;
