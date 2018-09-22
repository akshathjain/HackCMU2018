const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getUser = require('./get-user');

function setupAuth() {
  passport.use(new LocalStrategy({ passReqToCallback: true },
    (req, username, password, callback) => {
      getUser(req.db, username, callback, false, true, password);
    }));

  passport.authMiddleware = () => (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(403).redirect('/');
  };

  passport.serializeUser((user, callback) => {
    callback(null, user.username);
  });

  passport.deserializeUser((req, username, callback) => {
    getUser(req.db, username, callback, true);
  });
}

module.exports = setupAuth;
