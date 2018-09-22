const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const checkAuth = require('../util/check-auth');

const router = express.Router();

/*
  POST do a login
    username (user:id in db)
    password (salted hash)
*/
router.post('/', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

/*
  GET dashboard page
  must be logged into access
*/
router.get('/dashboard', checkAuth, (req, res) => {
  res.render('dashboard');
});

/*
  POST create an account
    username (should not be duplicate)
    password (salted hash)
    email (not verified)
*/
router.post('/signup', (req, res, next) => {
  const { username, password, email } = req.body;

  // make sure we have valid params
  if (!username || !password || !email) {
    return next(createError(400, 'Provide username, password hash, and email'));
  }

  // check if user exists already
  req.db.exists(`user:${username}`, (err, reply) => {
    if (err) return next(createError(500, err));
    if (reply) return next(createError(409, 'Username taken'));

    // create user account
    req.db.hmset(`user:${username}`, {
      username,
      password,
      email,
    }, (createErr) => {
      if (createErr) return next(createError(500, err));
      res.status(200).send(`Created user ${username} with email ${email}`);
    });
  });
});

/*
  GET check if a username is taken (for sign up form)
*/
router.post('/usercheck', (req, res, next) => {
  const { username } = req.query;

  // make sure we have valid param
  if (!username) return next(createError(400, 'Provide a username to check'));

  // check if the user exists already
  req.db.exists(`user:${username}`, (err, reply) => {
    if (err) return next(createError(500, err));
    if (reply) return res.sendStatus(409);
    res.sendStatus(200);
  });
});

/*
  GET logout (poof!)
*/
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
