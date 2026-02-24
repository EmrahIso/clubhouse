const { validationResult } = require('express-validator');
const passport = require('passport');

module.exports.getLoginUser = (req, res) => {
  res.render('log-in', { title: 'Log In', errors: [] });
};

module.exports.postLoginUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render('log-in', { title: 'Log In', errors: errors.array() });
  }

  try {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Pass the passport error message to the template
        return res.status(401).render('log-in', {
          title: 'Log In',
          errors: [
            { msg: info && info.message ? info.message : 'Login failed.' },
          ],
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  } catch (error) {
    console.error('Unexpected error in login controller:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
