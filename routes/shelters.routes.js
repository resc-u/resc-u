const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Animal = require("../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/", async (req, res) => {
  const user = req.session.loggedInUser;
  try {
    const shelters = await User.find({ usertype: "Shelter" });
    console.log(shelters);
    res.render("users/shelters/list-of-shelters", { shelters });
  } catch (e) {
    res.render("users/shelters/list-of-shelters", {
      currentUser: user,
      messages: { error: "We are sorry, there has been an error." },
    });
  }
});

router.get("/animals", (req, res) => {
  Animal.find({ shelter: req.session.loggedInUser._id })
    .then((animalsFromDB) => {
      res.render("users/shelters/shelter-animal-list.hbs", {
        animalslist: animalsFromDB,
      });
    })
    .catch((err) =>
      console.log(`Error while getting the animals from the DB: ${err}`)
    );
});

module.exports = router;
