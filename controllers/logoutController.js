module.exports.getLogoutUser = (req, res, next) => {
  res.render('log-out');
};

module.exports.postLogoutUser = (req, res, next) => {
  try {
    req.logout((error) => {
      if (error) next(error);

      req.session.destroy((error) => {
        if (error) next(error);

        res.clearCookie('connect.sid', { path: '/' });
        res.status(201).redirect('/');
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
