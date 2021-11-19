const { Schema, model } = require("mongoose");

const User = require("./User.model"); // we have to make sure our Book schema is aware of the User schema

const Adopter = User.discriminator(
  "Adopter",
  new mongoose.Schema({
    location: String,
    children: Boolean,
    animalPreference: { type: String, enum: ["dog", "cat", "turtle", "fish"] },
    house: {
      type: String,
      enum: ["big apartment", "house", "small apartment"],
    },
  })
);

module.exports = mongoose.model("Adopter");
