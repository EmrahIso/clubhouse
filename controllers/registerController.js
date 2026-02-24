const { validationResult } = require('express-validator');
const { generatePassword } = require('../utils/passwordUtils');
const { addUser } = require('../db/queries/userQueries');

module.exports.postRegisterUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render('sign-up', { title: 'Create Account', errors: errors.array() });
  }

  try {
    let { username, full_name, email, password } = req.body;

    email = email.trim().toLowerCase();
    username = username.trim();

    const { hash, salt } = await generatePassword(password);
    const isMember = false; // By default all users are not members.

    await addUser({ username, full_name, email, hash, salt, isMember });

    return res.redirect('/log-in');
  } catch (error) {
    if (error.code === '23505') {
      return res
        .status(409)
        .json('Email or username already exists. Please choose another.');
    }

    // Generic server error
    return res
      .status(500)
      .json('An error occurred while registering. Please try again.');
  }
};

module.exports.getRegisterUser = (req, res) => {
  res.render('sign-up', { title: 'Create Account', errors: [] });
};
