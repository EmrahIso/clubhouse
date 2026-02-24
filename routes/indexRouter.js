const { Router } = require('express');
const indexController = require('../controllers/indexController');
const pageParamValidator = require('../validators/pageParamValidator');

const indexRouter = Router();

indexRouter.get('/', pageParamValidator, indexController.getIndex);

module.exports = indexRouter;
