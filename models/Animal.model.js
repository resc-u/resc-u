const { Schema, model } = require("mongoose");

const animalSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  sex: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
  },
  age: { type: Number },
  status: {
    type: String,
    enum: ["awaiting adoption", "adopted"],
  },
  color: { type: String },
  breed: { type: String },
  dateofentry: { type: Date, default: Date.now },
  images: { type: [String] },
  kidfriendly: { type: Boolean },
  shelter: { type: Schema.Types.ObjectId, ref: "Shelter" },
});

module.exports = model("Animal", animalSchema);
