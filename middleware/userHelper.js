
module.exports = {

  isLoggedIn: function(req, res, next) {
    if (req.session.loggedInUser) {
      next();
    } else {
      console.log("please log in first");
      res.redirect("/");
    }
  },
  
  isNotLoggedIn: function(req, res, next) {
    if (req.session.loggedInUser) {
      console.log("user already logged in");
      res.redirect("/users/profile");
    } else {
      console.log("attempting to log in...");
      next();
    }
  }
}
