const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const userHelper = require("../middleware/userHelper");
const fileUploader = require("../config/cloudinary.config");

const { isLoggedIn } = require("../middleware/userHelper");

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
        res.render("users/adopters/profile", { user, canEdit, currentUser: loggedInUser });
        break;
      case "shelter":
      case "Shelter":
        res.render("users/shelters/profile", { user, canEdit, currentUser: loggedInUser });
        break;
      default:
        res.send("oops");
        break;
    }
} catch (e) {
  res.render("homepage", { error: { type: "DB_ERR", message: e }})
}});

/* profile edit */
router
  .route("/:usertype/:username/profile-edit")
  .get((req, res) => {
    // get user info from cookie
    const user = req.session.loggedInUser

    switch (req.params.usertype) {
      case "adopter":
      case "Adopter":
        res.render("users/adopters/edit-profile", { user, currentUser: user })
        break;
      case "shelter":
      case "Shelter":
        console.log(user);
        res.render("users/shelters/edit-profile", { user, currentUser: user });
        break;
      default:
        res.send("oops");
        break;
    }
  })
  .post(isLoggedIn, async (req, res) => {
    const user = req.session.loggedInUser;
    const updatedUser = null

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
      req.session.loggedInUser = updatedUser

    } catch (e) {

        let error = { type: "DB_ERR", message: e}

        switch (user.usertype) {
            case "Adopter":
              res.render("users/adopters/edit-profile", { error, currentUser: user })
              break;
            case "Shelter":
              res.render("users/shelters/edit-profile", { error, currentUser: user })
              break;
            default:
              res.render("users/admin/control-panel", { error, currentUser: user })
          }

    } finally {
      // redirect back to the profile
      req.flash('info', 'Changes successfully saved!')
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

