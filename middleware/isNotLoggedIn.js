function isNotLoggedIn(req, res, next) {
  const user = req.session.loggedInUser;
  if (user) {
    console.log("user already logged in");
    res.redirect(`/users/${user.usertype}/${user.username}`);
  } else {
    console.log("attempting to log in...");
    next();
  }
}

module.exports = isNotLoggedIn;
