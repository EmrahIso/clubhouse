const { validationResult } = require('express-validator');

const { updateAdminStatus } = require('../db/queries/adminQueries');

module.exports.getAdmin = (req, res) => {
  res.render('admin', { errors: null });
};

module.exports.postAdminPromote = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('admin', {
      title: 'Admin Area',
      errors: errors.array(),
    });
  }

  try {
    const passcode = req.body.admin_passcode;

    if (passcode === process.env.ADMIN_PASSWORD) {
      await updateAdminStatus({ userId: req.user.id, newValue: true });

      return res.status(201).redirect('/');
    } else {
      return res.status(401).render('admin', {
        title: 'Admin Area',
        errors: [
          {
            msg: 'Incorrect admin passcode.',
          },
        ],
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
