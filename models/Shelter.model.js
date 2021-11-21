const { Schema, model } = require("mongoose");

const User = require("./User.model"); 

const Shelter = User.discriminator("Shelter",
  new Schema({
        name:  { type: String },
        address:  { type: String },
        contact_email:  { type: String }, 
        contact_phone: String 
    })
);

module.exports = model('Shelter');
