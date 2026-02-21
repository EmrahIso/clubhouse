const { validationResult } = require('express-validator');
const { updateMemberStatus } = require('../db/queries/memberQueries');

module.exports.getMembers = (req, res) => {
  res.render('members', { errors: null });
};

module.exports.postJoinMembers = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render('members', {
        title: 'Members Area',
        errors: errors.array(),
      });
    }

    const passcode = req.body.passcode;

    if (passcode === process.env.MEMBER_PASSWORD) {
      await updateMemberStatus({ userId: req.user.id, newValue: true });

      return res.status(201).redirect('/');
    } else {
      return res.status(401).render('members', {
        title: 'Members Area',
        errors: [
          {
            msg: 'Incorrect members passcode.',
          },
        ],
      });
    }
  } catch (error) {
    console.error('Unexpected error in login controller:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};

module.exports.postLeaveMembers = async (req, res) => {
  try {
    await updateMemberStatus({ userId: req.user.id, newValue: false });

    return res.status(201).redirect('/');
  } catch (error) {
    console.error('Unexpected error in login controller:', error);
    return res.status(500).send('Something went wrong on our end!');
  }
};
