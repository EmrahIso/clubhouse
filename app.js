const express = require('express');
const dotenv = require('dotenv');
const path = require('node:path');
const helmet = require('helmet');
const session = require('express-session');
const psSession = require('connect-pg-simple')(session);
const passport = require('passport');

const pool = require('./db/pool');

// Routers
const indexRouter = require('./routes/indexRouter');
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const membersRouter = require('./routes/membersRouter');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new psSession({
  pool: pool,
  tableName: 'session',
  createTableIfMissing: false,
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24, // One day
    },
  })
);

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.isMember = req.user?.is_member ?? false;
  res.locals.user = req.user;

  next();
});

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/log-in', loginRouter);
app.use('/log-out', logoutRouter);
app.use('/members', membersRouter);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
