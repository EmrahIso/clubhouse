const { Router } = require('express');
const registerController = require('../controllers/registerController');
const registerValidator = require('../validators/registerValidator');

const registerRouter = Router();

registerRouter.get('/', registerController.getRegisterUser);
registerRouter.post(
  '/',
  registerValidator,
  registerController.postRegisterUser
);

module.exports = registerRouter;
