function isNotLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    console.log("user already logged in");
    res.redirect("/users/profile");
  } else {
    console.log("attempting to log in...");
    next();
  }
}

module.exports = isNotLoggedIn;
