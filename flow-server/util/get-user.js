function getUser(db, username, callback, passError, checkPassword, password) {
  db.hgetall(`user:${username}`, (err, reply) => {
    // make sure the user exists
    if (err) return callback(err);
    if (!reply) return callback(passError ? 'Invalid user' : null, false);

    const user = reply;
    // check password if necessary
    if (checkPassword) {
      if (password === user.password) {
        // remove password
        delete user.password;
        callback(null, user);
      } else {
        callback(passError ? 'Wrong password' : null, false);
      }
    } else {
      // remove password
      delete user.password;
      callback(null, user);
    }
  });
}

module.exports = getUser;
