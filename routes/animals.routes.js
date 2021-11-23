const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Animal = require("../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res) => {
  Animal.find()
    .then((animalsFromDB) => {
      res.render("animals/animals-list.hbs", { animalslist: animalsFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the animals from the DB: ${err}`)
    );
});

router.route("/new").get((req, res) => {
  res.render("animals/new-animal.hbs");
});
// POST route for saving a new animal in the database
// This route has the image upload example
router.post("/new", fileUploader.array("animal-image[]", 3), (req, res) => {
  const {
    name,
    description,
    type,
    sex,
    size,
    age,
    status,
    color,
    breed,
    dateofentry,
    kidfriendly,
  } = req.body;

  Animal.create({
    name,
    description,
    type,
    sex,
    size,
    age,
    status,
    color,
    breed,
    dateofentry,
    kidfriendly,
    imageUrl: req.files,
    shelter: req.session.loggedInUser._id,
  })
    .then((newlyCreatedAnimalFromDB) => {
      console.log(req.files);
      console.log(newlyCreatedAnimalFromDB);
      res.render("animals/new-animal.hbs");
    })
    .catch((error) =>
      console.log(`Error while creating a new animal: ${error}`)
    );
});

module.exports = router;
