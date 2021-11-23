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

/* users profile page */
router.get("/:usertype/:username", isLoggedIn, async (req, res) => {
  try {
    // get user info from cookie
    const loggedInUser = req.session.loggedInUser;

    // find user in the DB
    const user = await User.findOne({ username: req.params.username });

    let canEdit = false;
    if (
      loggedInUser.email === user.email ||
      loggedInUser.usertype === undefined
    )
      canEdit = true;

    // render profile page for that user
    switch (req.params.usertype) {
      case "adopter":
      case "Adopter":
        res.render("users/adopters/profile", { user, canEdit });
        break;
      case "shelter":
      case "Shelter":
        res.render("users/shelters/profile", { user, canEdit });
        break;
      default:
        res.send("oops");
        break;
    }
  } catch (error) {
    console.error(error);
  }
});

/* profile edit */
router
  .route("/:usertype/:username/profile-edit")
  .get((req, res) => {
    // get user info from cookie
    const user = req.session.loggedInUser;

    switch (req.params.usertype) {
      case "adopter":
      case "Adopter":
        res.render("users/adopters/edit-profile", { user });
        break;
      case "shelter":
      case "Shelter":
        console.log(user);
        res.render("users/shelters/edit-profile", { user });
        break;
      default:
        res.send("oops");
        break;
    }
  })
  .post(async (req, res) => {
    const user = req.session.loggedInUser;
    try {
      let updatedUser = null;
      switch (user.usertype) {
        case "Adopter":
          // deconstruct body and take info from the form
          const { fullname, children, animalPreference, housingSize } =
            req.body;
          updatedUser = await Adopter.findByIdAndUpdate(
            user._id,
            { fullname, children, animalPreference, housingSize },
            { new: true }
          );
          break;
        case "Shelter":
          // deconstruct body and take info from the form
          const { shelterName } = req.body;
          updatedUser = await Shelter.findByIdAndUpdate(
            user._id,
            { name, address, contact_phone },
            { new: true }
          );
          break;
      }
      // update the cookie
      req.session.loggedInUser = updatedUser;
    } catch (error) {
      console.error(error);
    } finally {
      // redirect back to the profile
      res.redirect(`/users/${user.usertype}/${user.username}`);
    }
  });

/* delete user */
router
  .route("/:usertype/:username/delete-user")
  .get((req, res) => {
    console.log(req.session.loggedInUser);
    res.render("users/delete-user", { user: req.session.loggedInUser });
  })
  .post(async (req, res) => {
    try {
      await User.findOneAndDelete({ username: req.params.username });
    } catch (error) {
      console.error(error);
    } finally {
      req.session.destroy((err) => {
        if (err) res.redirect("/");
        else res.redirect("/");
      });
    }
  });

module.exports = router;
