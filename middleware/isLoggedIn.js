function isLoggedIn(req, res, next) {
  if (req.session.loggedInUser) {
    next();
  } else {
    console.log("please log in first");
    res.redirect("/");
  }
}

module.exports = isLoggedIn;
