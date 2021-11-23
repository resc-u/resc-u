
module.exports = {

  isLoggedIn: function(req, res, next) {
    if (req.session.loggedInUser) {
      next();
    } else {
      req.flash('error', 'Please, log in first!')
      res.redirect("/");
    }
  },
  
  isNotLoggedIn: function(req, res, next) {
    const user = req.session.loggedInUser;
    if (user) {
      console.log("user already logged in");
      res.redirect(`/users/${user.usertype}/${user.username}`);
    } else {
      console.log("attempting to log in...");
      next();
    }
  }

}
