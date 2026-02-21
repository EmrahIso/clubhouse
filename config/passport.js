const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { getUserByEmail, getUserById } = require('../db/queries/userQueries');
const { verifyPassword } = require('../utils/passwordUtils');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        email = email.trim().toLowerCase();
        const user = await getUserByEmail({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect email address.' });
        }

        const password_hash = user.password_hash;

        const isValid = await verifyPassword(password, password_hash);

        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await getUserById({ userId });

    if (!user) {
      return done(null, false, { message: 'Incorrect user Id.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

// Regenerisati sesiju nakon logina
// Obirsati cookie nakon sto mu rok istekne
