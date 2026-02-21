const { body } = require('express-validator');

const loginValidator = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ min: 3, max: 40 })
    .withMessage(
      'Email must be at least 3 characters long and no more than 40 characters long.'
    )
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
];

module.exports = loginValidator;
