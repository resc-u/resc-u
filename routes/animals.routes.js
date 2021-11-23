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
})
.post( fileUploader.array("animal-image[]", 3), (req, res) => {
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
        res.redirect("/shelters/animals");
      })
      .catch((error) =>
        console.log(`Error while creating a new animal: ${error}`)
      );
  });


router.get("/:id", (req, res) => {
    Animal.findById(req.params.id, function (err, foundbyid){
        if (err) { return console.log(err)}
        res.render("animals/animal-page.hbs", foundbyid)
    })

})

router.get("/edit/:id", (req, res) => {
    let id = req.params.id
    Animal.findById(id, function (err, foundbyid){
        if (err) { return console.log(err)}
        res.render("animals/animal-edit.hbs", foundbyid)
    })
});
router.post("/edit/:id", fileUploader.array("animal-image[]", 3), (req, res) => {
      
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

 let id = req.params.id

    Animal.findOneAndUpdate  (id, {
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
     // shelter: req.session.loggedInUser._id,
}).then((newlyUpdatedAnimalFromDB) => {
   
    res.redirect("/shelters/animals");
  })
  .catch((error) =>
    console.log(`Error while updating an animal: ${error}`)
  );

} )

router.get("/delete/:id", async(req, res) => {

    let id = req.params.id
    
    try {

   await Animal.findByIdAndDelete( id ) 
    
    res.redirect("/shelters/animals")
    
    } 
    
    catch(e) { 
        return console.log(e)
    }
    
})


module.exports = router;
