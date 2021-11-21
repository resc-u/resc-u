const { Schema, model } = require("mongoose");
const User = require("./User.model"); 

const Adopter = User.discriminator("Adopter",
  new Schema(
    {
      fullname: String,
      location: String,
      children: Boolean,
      animalPreference: { type: String, enum: ["dog", "cat", "turtle", "fish"] },
      housingSize: {
        type: String,
        enum: ["small apartment", "big apartment", "house"]
      }
    })
);

module.exports = model('Adopter');
