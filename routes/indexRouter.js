const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
  });
});

indexRouter.get('login-success', (req, res) => {
  res.send('logged in');
});

indexRouter.get('login-failure', (req, res) => {
  res.send('not logged in');
});

module.exports = indexRouter;
