const { Schema, model } = require("mongoose");
const User = require("./User.model"); 

const Adopter = User.discriminator("Adopter",
  new Schema(
    {
      fullname: String,
      location: String,
      children: Boolean,
      animalPreference: [String],
      housingSize: {
        type: String,
        enum: ["small apartment", "big apartment", "house"]
      }
    })
);

module.exports = model('Adopter');
