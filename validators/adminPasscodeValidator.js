const { body } = require('express-validator');

const membersValidator = [
  body('admin_passcode').notEmpty().withMessage('Admin passcode is required'),
];

module.exports = membersValidator;
