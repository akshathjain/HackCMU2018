const createError = require('http-errors');
const express = require('express');

const router = express.Router();

/*
  POST data points for a Flow
    id (of the Flow in question, should be registered)
    value (should be an int or float)
  Timestamp is recorded on the server
*/

router.post('/flow', (req, res, next) => {
  const { id } = req.query;
  const { value } = req.body;

  // make sure we have valid params
  if (!id || !value || Number.isNaN(value)) {
    next(createError(400, 'Provide a value Flow ID and data value'));
  }

  // check for Flow membership in db
  req.db.sismember('flows', id, (err, reply) => {
    if (err) return next(createError(500, err));
    if (!reply) return next(createError(404, 'Flow not found'));

    // insert data into sorted set for this Flow (include timestamp)
    const timestamp = Date.now();
    req.db.zadd([`flow:${id}`, timestamp, value], (addErr) => {
      if (addErr) return next(createError(500, err));
      res.status(200).send(`Recorded data for Flow ${id} at ${timestamp}`);
    });
  });
});

module.exports = router;
