const { Router } = require('express');

const { isAuth } = require('../middlewares/authMiddlewares');
const postsValidator = require('../validators/postsValidator');
const postController = require('../controllers/postsController');

const postsRouter = Router();

postsRouter.get('/new', isAuth, postController.getNewPost);

postsRouter.post('/new', isAuth, postsValidator, postController.postNewPost);

module.exports = postsRouter;
