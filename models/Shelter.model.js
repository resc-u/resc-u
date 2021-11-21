const { Schema, model } = require("mongoose");

const User = require("./User.model"); 

const Shelter = User.discriminator("Shelter",
  new Schema({
        name:  { type: String, required: true },
        address:  { type: String, required: true },
        contact_email:  { type: String, required: true }, 
        contact_phone: String 
    })
);

module.exports = model("Shelter", Shelter);
