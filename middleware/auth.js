function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
}

module.exports = { ensureAuthenticated };
