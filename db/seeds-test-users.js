
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcrypt")

const users = [
    {
        username: "test-adopter",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
        email: "adopter@test.com",
        role: "adopter"
    },
    {
        username: "test-shelter",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
        email: "shelter@test.com",
        role: "shelter"
    },
    {
        username: "test-admin",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
        email: "admin@test.com",
        role: "admin"
    }
];

// connects to DB
require('./index');

User.deleteMany()
.then(deletedUsers =>
  console.log(`Deleted ${deletedUsers.deletedCount} testing users`)
)
.then(
  User.insertMany(users)
  .then(insertedUsers => {
    console.log(`Created ${insertedUsers.length} testing users`)
    mongoose.connection.close()}
  ))
.catch(err =>
   console.log(`An error occurred seeding testing users to the DB: ${err}`)
)