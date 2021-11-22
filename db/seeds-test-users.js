const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const uri = "mongodb+srv://user:pass@resc-u.okafj.mongodb.net/resc-u";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "admin",
  pass: "1234",
};

// When successfully connected
mongoose.connection.on("connected", () =>
  console.log("Mongoose default connection open")
);

// When the connection is disconnected
mongoose.connection.on("disconnected", () =>
  console.log("Mongoose default connection disconnected")
);

// If the connection throws an error
mongoose.connection.on("error", (err) =>
  console.log(`Mongoose default connection error: ${err}`)
);

const users = [
  {
    username: "test-adopter",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
    email: "adopter@test.com",
    role: "adopter",
  },
  {
    username: "test-shelter",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
    email: "shelter@test.com",
    role: "shelter",
  },
  {
    username: "test-admin",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
    email: "admin@test.com",
    role: "admin",
  },
];

const seedDB = async () => {
  try {
    // connect to DB
    mongoose.connect(uri, options);

    // delete all users in DB
    const usersInDb = await User.find();
    const deletedUsers = await User.deleteMany({ usersInDb });
    console.log(`Deleted ${deletedUsers.deletedCount} testing users`);

    // insert test users in DB
    const insertedUsers = await User.insertMany(users);
    console.log(`Created ${insertedUsers.length} testing users`);
  } catch (err) {
    console.log(`An error occurred seeding testing users to the DB: ${err}`);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
