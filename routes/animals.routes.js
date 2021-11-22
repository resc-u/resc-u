const router = require("express").Router();
const User = require("../models/User.model")
const Adopter = require("../models/Adopter.model")
const Animal = require("../models/Animal.model.js")


// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.config');

router.route("/new")
.get((req,res)=>{
    res.render("animals/new-animal.hbs")
})
// .post(()=>{})


module.exports = router;
