const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Animal = require("../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/animals", (req, res) => {
  Animal.find({ shelter: req.session.loggedInUser._id })
    .then((animalsFromDB) => {
      res.render("shelters/shelter-animal-list.hbs", {
        animalslist: animalsFromDB,
      });
    })
    .catch((err) =>
      console.log(`Error while getting the animals from the DB: ${err}`)
    );
});

module.exports = router;
