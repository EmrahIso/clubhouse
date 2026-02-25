const { Router } = require('express');

const adminController = require('../controllers/adminController');
const adminValidator = require('../validators/adminPasscodeValidator');

const { isAuth } = require('../middlewares/authMiddlewares');

const adminRouter = Router();

adminRouter.get('/', isAuth, adminController.getAdmin);

adminRouter.post(
  '/promote',
  isAuth,
  adminValidator,
  adminController.postAdminPromote
);

module.exports = adminRouter;
