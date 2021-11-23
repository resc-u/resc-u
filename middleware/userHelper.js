
module.exports = {

  isLoggedIn: function(req, res, next) {
    if (req.session.loggedInUser) {
      next();
    } else {
      req.flash('error', 'Please, log in first!', false)
      //console.log("please log in first");
      res.redirect("/");
    }
  },
  
  isNotLoggedIn: function(req, res, next) {
    if (req.session.loggedInUser) {
      req.flash('error', 'You are already logged in', false)
      res.redirect("/users/profile");
    } else {
      console.log("Attempting to log in...");
      next();
    }
  }
}
