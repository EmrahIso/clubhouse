const { Router } = require('express');

const { isAuth } = require('../middlewares/authMiddlewares');
const postsValidator = require('../validators/postsValidator');
const postsParamValidator = require('../validators/postsParamValidator');
const postController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get('/new', isAuth, postController.getNewPost);

postsRouter.post('/new', isAuth, postsValidator, postController.postNewPost);

postsRouter.get(
  '/delete',
  isAuth,
  postsParamValidator,
  postController.getDeletePost
);

module.exports = postsRouter;
