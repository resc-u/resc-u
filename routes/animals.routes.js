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
      res.render("animals/animal-page.hbs", { animal, currentUser });
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
    const shelterId = req.session.loggedInUser._id;

    Animal.findOneAndUpdate(
      id,
      {
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
      },
      { new: true }
    )
      .then((newlyUpdatedAnimalFromDB) => {
        console.log(newlyUpdatedAnimalFromDB);
        res.redirect(`/shelters/animals/${shelterId}`);
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

  let { limit = 6, page = 0, type } = req.query;
  const pagination = {
    limit,
    prevPage: parseInt(page) - 1,
    nextPage: parseInt(page) + 1,
  };
  if (pagination.prevPage <= 0) pagination.prevPage = 0;

  console.log("=====> query: ", req.query);
  console.log("queryTYPE==>", type);

  const filter = {};
  if (type) filter.type = type;

  console.log(filter);

  try {
    // all animals from DB
    let animalsList = await Animal.find(filter)
      .skip(limit * page)
      .limit(limit);

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
      /*  animalsList = animalsList.filter((animal) =>
        req.query.type.includes(animal.type)
      ); */
      // handle checkboxes
      typeCheckBoxes.forEach((type) => {
        if (req.query.type.includes(type.name)) {
          type.checked = true;
        }
      });
    }

    res.render("animals/animals-list.hbs", {
      animals: animalsList,
      pagination,
      types: typeCheckBoxes,
      currentUser,
    });
  } catch (err) {
    console.log(`Error while getting the animals from the DB: ${err}`);
  }
});

module.exports = router;
