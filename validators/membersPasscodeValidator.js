const { body } = require('express-validator');

const membersValidator = [
  body('passcode').notEmpty().withMessage('Password is required'),
];

module.exports = membersValidator;
