const router = require("express").Router();
const User = require("../../models/User.model");
const Shelter = require("../../models/Shelter.model");
const Adopter = require("../../models/Adopter.model");
const isLoggedIn = require("../../middleware/isLoggedIn");
const Animal = require("../../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../../config/cloudinary.config");

// GET /adopters ==> list of adopters
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

/* adopters profile page */
router.get("/:username", isLoggedIn, async (req, res) => {
  try {
    // get user info from cookie
    const loggedInUser = req.session.loggedInUser;

    // find user in the DB
    const user = await User.findOne({ username: req.params.username });

    // render profile page for that user
    res.render("users/adopters/profile", { user });
  } catch (error) {
    console.error(error);
  }
});

/* profile edit */
router
  .route("/:username/edit-profile")
  .get(async (req, res) => {
    try {
      // get user info from cookie
      const loggedInUser = req.session.loggedInUser;

      // user from DB
      const user = await User.findOne({ username: req.params.username });

      // checks if the email in the cookie is same as the users, or if you are an admin
      if (user.email === loggedInUser.email || loggedInUser.role === "admin") {
        res.render("users/adopters/edit-profile", { user });
      } else {
        res.send("you don't have permission to edit!");
      }
    } catch (error) {}
  })
  .post(async (req, res) => {
    const user = req.session.loggedInUser;
    try {
      // deconstruct body and take info from the form
      const { fullname, children, animalPreference, housingSize } = req.body;

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
      // redirect back to the users' profile
      res.redirect(`/adopters/${user.username}`);
    }
  });

module.exports = router;
