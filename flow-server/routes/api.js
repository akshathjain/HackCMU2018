const createError = require('http-errors');
const express = require('express');
const checkAuth = require('../util/check-auth');

const router = express.Router();

/*
  POST data points for a Flow
    id (of the Flow in question, should be registered)
    timestamp (should be a numerical representation)
    value (should be an int or float)
  timestamp is recorded on the server
*/
router.post('/flow', (req, res, next) => {
  const { id } = req.query;
  const { timestamp, value } = req.body;

  // make sure we have valid params
  if (!id || !timestamp || !value || Number.isNaN(value)) {
    return next(createError(400, 'Provide a Flow ID, timestamp, and value'));
  }

  // check for Flow membership in db
  req.db.sismember('flows', id, (err, reply) => {
    // make sure the Flow exists
    if (err) return next(createError(500, err));
    if (!reply) return next(createError(404, 'Flow not found'));

    // insert data into sorted set for this Flow (include timestamp)
    req.db.zadd([`flow:${id}`, timestamp, value], (addErr) => {
      if (addErr) return next(createError(500, err));
      res.status(200).send(`Recorded data for Flow ${id} at ${timestamp}`);
    });
  });
});

/*
  POST register a Flow
    id (of the Flow in question, should be unregistered)
  username inferred from auth
*/
router.post('/register', checkAuth, (req, res, next) => {
  const { id } = req.body;
  const { username } = req.user;

  // make sure we have valid params
  if (!id || !username) {
    return next(createError(400, 'Provide a Flow ID and username'));
  }

  // make sure user doesn't already have a Flow
  if (req.user.flow) {
    return next(createError(409, 'User already has a Flow registered'));
  }

  // make sure Flow is not registered already
  req.db.sismember('flows', id, (err, reply) => {
    if (err) return next(createError(500, err));
    if (reply) return next(createError(409, 'Flow already registered'));

    // enroll this Flow for the user
    req.db.hset(`user:${username}`, 'flow', id, (regErr) => {
      if (regErr) return next(createError(500, err));

      // mark flow as registered in db set
      req.db.sadd('flows', id, (addErr) => {
        if (addErr) return next(createError(500, err));
        res.status(200).send(`Registered Flow ${id} to ${username}`);
      });
    });
  });
});

/*
  POST deregister a Flow
  username inferred from auth
  id based on user's current flow
*/
router.post('/deregister', checkAuth, (req, res, next) => {
  const { username } = req.user;
  const id = req.user.flow;

  // make sure we have valid params
  if (!id || !username) {
    return next(createError(400, 'Provide a Flow ID and username'));
  }

  // make sure Flow is marked as registered
  req.db.sismember('flows', id, (err) => {
    if (err) return next(createError(500, err));

    // disenroll this Flow from the user
    req.db.hdel(`user:${username}`, 'flow', (derErr) => {
      if (derErr) return next(createError(500, err));

      // remove Flow registration in db
      req.db.srem('flows', id, (remErr) => {
        if (remErr) return next(createError(500, err));
        res.status(200).send(`Deregistered Flow ${id} from ${username}`);
      });
    });
  });
});

/*
  GET data points for a Flow
  must be logged in to access
*/
router.get('/myflow', checkAuth, (req, res, next) => {
  const { id } = req.query;

  // get values with timestamps
  req.db.zrange([`flow:${id}`, 'withscores'], (err, reply) => {
    if (err) return next(createError(500, err));
    res.json(reply);
  });
});

module.exports = router;
