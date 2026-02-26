const { validationResult } = require('express-validator');
const { addNewPost, deletePost } = require('../db/queries/postsQueries');

module.exports.getNewPost = (req, res) => {
  res.render('new-post', {
    title: 'New Post',
    errors: null,
  });
};

module.exports.postNewPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render('new-post', { title: 'New Post', errors: errors.array() });
  }

  try {
    await addNewPost({
      userId: req.user.id,
      title: req.body.post_title,
      content: req.body.post_content,
    });

    return res.status(201).redirect('/');
  } catch (error) {
    return res
      .status(500)
      .json('An error occurred while registering. Please try again.');
  }
};

module.exports.getDeletePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0].msg);
  }

  try {
    const postId = req.query.post_id;

    await deletePost({ postId });

    res.status(201).redirect('/');
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
