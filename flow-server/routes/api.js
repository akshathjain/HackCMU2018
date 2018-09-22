const express = require('express');

const router = express.Router();

/*
  POST data points for a Flow
    id (of the Flow in question, should be registered)
    value (should be an int or float)
  Timestamp is recorded on the server
*/
router.get('/flow', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
