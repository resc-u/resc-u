const router = require("express").Router();
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Animal = require("../models/Animal.model.js");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router
  .route("/new")
  .get((req, res) => {
    const currentUser = req.session.loggedInUser;

    res.render("animals/new-animal.hbs", { currentUser });
  })
  .post(fileUploader.array("animal-image[]", 3), (req, res) => {
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
        res.redirect("/shelters/animals");
      })
      .catch((error) =>
        console.log(`Error while creating a new animal: ${error}`)
      );
  });

router.get("/:id", (req, res) => {
  const currentUser = req.session.loggedInUser;

  Animal.findById(req.params.id)
    .populate("shelter")
    .then((animal) => {
      res.render("animals/animal-page", { animal, currentUser });
    })
    .catch((e) => {
      console.log(`Error while creating a new animal: ${e}`);
    });
});


router.get("/:id/:fav", async (req, res) => {
  const currentUser = req.session.loggedInUser;
  const fav = req.params.fav

  console.log("====>", fav)

  Animal.findById(req.params.id)
    .populate("shelter")
    .then((animal) => {
      
      let favorites = currentUser.favorites
      let msg = ""

      if (fav === "addFav") {
        favorites.push(animal.id)
        msg = "Favorite animal added to profile!"
      } else if (fav === "removeFav") {
        favorites.splice(animal.id)
        msg = "Favorite animal removed from profile!"
      }

      console.log("My favorites ====>", favorites)

      Adopter.findByIdAndUpdate(currentUser.id, { favorites: favorites })
          .then( (user) => console.log(msg))
          .catch((e) => console.log("Error adding or removing favorite animal: ", e))

      res.render("animals/animal-page", { animal, currentUser });
    })
    .catch((e) => {
      console.log(`Error while creating a new animal: ${e}`);
    });
});

router
  .route("/edit/:id")
  .get((req, res) => {
    const currentUser = req.session.loggedInUser;

    let id = req.params.id;
    Animal.findById(id, function (err, foundbyid) {
      if (err) {
        return console.log(err);
      }
      res.render("animals/animal-edit.hbs", { animal: foundbyid, currentUser });
    });
  })
  .post((req, res) => {
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

    let id = req.params.id;

    Animal.findOneAndUpdate(id, {
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
      // shelter: req.session.loggedInUser._id,
    })
      .then((newlyUpdatedAnimalFromDB) => {
        res.redirect("/shelters/animals");
      })
      .catch((error) =>
        console.log(`Error while updating an animal: ${error}`)
      );
  });

router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;

  try {
    await Animal.findByIdAndDelete(id);

    res.redirect("/shelters/animals");
  } catch (e) {
    return console.log(e);
  }
});


router.get("/", async (req, res) => {
  const currentUser = req.session.loggedInUser;
  const {limit = 3, page = 0} = req.query

  console.log("=====> query: ", req.query)
  console.log("=====> limit: ", limit)
  console.log("=====> page: ", page)

  try {
    // all animals from DB
    let animalsList = await Animal.find().skip(limit*page).limit(limit);

    // populate animalTypes with all the different types of animals
    const animalTypes = [];
    animalsList
      .map((animal) => animal.type)
      .forEach((type) => {
        if (animalTypes.includes(type) === false) animalTypes.push(type);
      });

    // create checkboxes objet
    const typeCheckBoxes = [];
    animalTypes.forEach((type) =>
      typeCheckBoxes.push({
        name: type,
        checked: false,
      })
    );

    /* FILTERS */
    // by type
    if (req.query.type) {
      // filter animals
      animalsList = animalsList.filter((animal) =>
        req.query.type.includes(animal.type)
      );
      // handle checkboxes
      typeCheckBoxes.forEach((type) => {
        if (req.query.type.includes(type.name)) {
          type.checked = true;
        }
      });
    }

    res.render("animals/animals-list.hbs", {
      animals: animalsList,
      pagination: {limit, prevPage: page - 1, nexPage: page + 1},
      types: typeCheckBoxes,
      currentUser,
    });
  } catch (err) {
    console.log(`Error while getting the animals from the DB: ${err}`);
  }
});

module.exports = router;
