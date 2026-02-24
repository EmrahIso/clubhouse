const { body } = require('express-validator');

const postsValidator = [
  body('post_title')
    .trim()
    .notEmpty()
    .withMessage('Posts title is required')
    .isLength({ min: 3, max: 40 })
    .withMessage(
      'Posts title must be at least 3 characters long and no more than 40 characters long.'
    ),
  body('post_content')
    .trim()
    .notEmpty()
    .withMessage('Posts content is required')
    .isLength({ min: 5, max: 300 })
    .withMessage(
      'Posts content must be at least 3 characters long and no more than 300 characters long.'
    ),
];

module.exports = postsValidator;
