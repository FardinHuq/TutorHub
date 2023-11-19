// Is Authenticated Middleware passport.js
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

// Is Admin Middleware passport.js
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.redirect("/");
};

module.exports = { isAuth, isAdmin };
