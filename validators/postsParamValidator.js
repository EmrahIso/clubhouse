const { query } = require('express-validator');

const postsParamValidator = [
  query('post_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Post id must be a positive integer')
    .toInt(),
];

module.exports = postsParamValidator;
