const {
  getAllPostsPagination,
  getAllPostsCount,
} = require('../db/queries/postsQueries');
const { validationResult } = require('express-validator');

module.exports.getIndex = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0].msg);
  }

  try {
    const LIMIT = 8;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * LIMIT;

    const [posts, totalPosts] = await Promise.all([
      getAllPostsPagination({ limit: LIMIT, offset }),
      getAllPostsCount(),
    ]);

    const totalPages = Math.ceil(totalPosts / LIMIT);

    res.render('index', {
      title: 'Home',
      posts,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
