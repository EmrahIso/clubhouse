const { query } = require('express-validator');

const pageParamValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
];

module.exports = pageParamValidator;
