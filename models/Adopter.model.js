const { Schema, model } = require("mongoose");
const User = require("./User.model"); 

const Adopter = User.discriminator("Adopter",
  new Schema(
    {
      location: String,
      children: Boolean,
      animalPreference: { type: String, enum: ["dog", "cat", "turtle", "fish"] },
      house: {
        type: String,
        enum: ["big apartment", "house", "small apartment"]
      }
    })
);

module.exports = model("Adopter", Adopter);
