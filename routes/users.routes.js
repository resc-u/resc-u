const router = require("express").Router();
const User = require("../models/User.model");
const Shelter = require("../models/Shelter.model");
const Adopter = require("../models/Adopter.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Animal = require("../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

// GET /users ==> list of users
router.route("/").get(async (req, res) => {
  let listUsers = [];
  let error = null;

  try {
    listUsers = await User.find();
  } catch (e) {
    error = { errType: "DB_ERR", message: e };
  } finally {
    res.render("users/list", { users: listUsers, error });
  }
});

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    // get user info from cookie
    const user = req.session.loggedInUser;
    switch (user.usertype) {
      case "Adopter":
        res.render("users/adopters/profile", { user });
        break;
      case "Shelter":
        res.render("users/shelters/profile", { user });
        break;
      default:
        res.send("you are a GOD!");
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

/* profile edit */
router
  .route("/profile/edit")
  .get((req, res) => {
    // get user info from cookie
    const user = req.session.loggedInUser;

    switch (user.usertype) {
      case "Adopter":
        res.render("users/adopters/edit-profile", { user });
        break;
      case "Shelter":
        res.render("users/shelters/edit-profile", { user });
        break;
      default:
        res.render("users/admin/control-panel", { user });
    }
  })
  .post(async (req, res) => {
    const user = req.session.loggedInUser;
    try {
      // deconstruct body and take info from the form
      const { fullname, children, animalPreference, housingSize } = req.body;

      // TODO update user, add shelter update
      const updatedUser = await Adopter.findByIdAndUpdate(
        user._id,
        { fullname, children, animalPreference, housingSize },
        { new: true }
      );
      // update the cookie
      req.session.loggedInUser = updatedUser;
    } catch (error) {
      console.error(error);
    } finally {
      // redirect back to the profile
      res.redirect("/users/profile");
    }
  });

module.exports = router;
