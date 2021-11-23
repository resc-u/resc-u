const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const userHelper = require("../middleware/userHelper");
const fileUploader = require("../config/cloudinary.config");

// GET /users ==> list of users
router.route("/").get(async (req, res) => {
  let listUsers = [];

  try {
    currentUser = req.session.loggedInUser
    listUsers = await User.find();
  } catch (e) {
    res.render("users/list", { error: { type: "DB_ERR", message: e, currentUser }})
  } finally {
    res.render("users/list", { users: listUsers, currentUser });
  }
});

router.get("/profile", userHelper.isLoggedIn, async (req, res) => {
    const user = null

    try {
    // get user info from cookie
    user = req.session.loggedInUser

    switch (user.usertype) {
      case "Adopter":
        res.render("users/adopters/profile", { user, currentUser: user })
        break;
      case "Shelter":
        res.render("users/shelters/profile", { user, currentUser: user })
        break;
      default:
        res.send("you are a GOD!")
        break;
    }
  } catch (e) {
    res.render("homepage", { error: { type: "DB_ERR", message: e, currentUser: user }})
  }
});

/* profile edit */
router
  .route("/profile/edit")
  .get((req, res) => {
    // get user info from cookie
    const user = req.session.loggedInUser

    switch (user.usertype) {
      case "Adopter":
        res.render("users/adopters/edit-profile", { user, currentUser: user })
        break;
      case "Shelter":
        res.render("users/shelters/edit-profile", { user, currentUser: user })
        break;
      default:
        res.render("users/admin/control-panel", { user, currentUser: user })
    }
  })
  .post(async (req, res) => {
    const user = req.session.loggedInUser;
    const updatedUser = null

    try {
      // deconstruct body and take info from the form
      const { fullname, children, animalPreference, housingSize } = req.body

      // TODO update user, add shelter update
      updatedUser = await Adopter.findByIdAndUpdate(
        user._id,
        { fullname, children, animalPreference, housingSize },
        { new: true }
      );
      // update the cookie
      req.session.loggedInUser = updatedUser

    } catch (e) {

        const error = { type: "DB_ERR", message: e}

        switch (user.usertype) {
            case "Adopter":
              res.render("users/adopters/edit-profile", { error, currentUser: updatedUser })
              break;
            case "Shelter":
              res.render("users/shelters/edit-profile", { error, currentUser: updatedUser })
              break;
            default:
              res.render("users/admin/control-panel", { error, currentUser: updatedUser })
          }

    } finally {
      // redirect back to the profile
      res.redirect("/users/profile");
    }
  });

module.exports = router;

