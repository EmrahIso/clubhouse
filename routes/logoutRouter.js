const { Router } = require('express');

const logoutController = require('../controllers/logoutController');
const { isAuth } = require('../middlewares/authMiddlewares');

const logoutRouter = Router();

logoutRouter.get('/', isAuth, logoutController.getLogoutUser);
logoutRouter.post('/', isAuth, logoutController.postLogoutUser);

module.exports = logoutRouter;
