const { Router } = require('express');

const membersController = require('../controllers/membersController');
const membersValidator = require('../validators/membersPasscodeValidator');

const { isAuth } = require('../middlewares/authMiddlewares');

const membersRouter = Router();

membersRouter.get('/', isAuth, membersController.getMembers);

membersRouter.post(
  '/join',
  isAuth,
  membersValidator,
  membersController.postJoinMembers
);

membersRouter.post('/leave', isAuth, membersController.postLeaveMembers);

module.exports = membersRouter;
