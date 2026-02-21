const { Router } = require('express');
const loginController = require('../controllers/loginController');
const loginValidator = require('../validators/loginValidator');

const loginRouter = Router();

loginRouter.get('/', loginController.getLoginUser);
loginRouter.post('/', loginValidator, loginController.postLoginUser);

module.exports = loginRouter;
