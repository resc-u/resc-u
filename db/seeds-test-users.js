
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Shelter = require("../models/Shelter.model");
const bcrypt = require("bcrypt")

const adopters = [
    {
        username: "test-adopter",
        password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
        email: "adopter@test.com",
        role: "adopter"
    }
];

const shelters = [
  {
      username: "test-shelter",
      password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
      email: "shelter@test.com",
      role: "shelter"
  }
];

const admins = [
  {
      username: "test-admin",
      password: bcrypt.hashSync("1234", bcrypt.genSaltSync(4)),
      email: "admin@test.com",
      role: "admin"
  }
];

// connects to DB
require('./index');

Adopter.deleteMany()
.then( users => console.log(`Deleted ${users.deletedCount} testing users (adopters)`) )
.then(
  Adopter.insertMany(adopters)
    .then( users => { console.log(`Created ${users.length} testing users (adopters)`)
                    mongoose.connection.close()} ))
.catch(err => console.log(`An error occurred seeding testing users (adopters) to the DB: ${err}`))

Shelter.deleteMany()
.then( users => console.log(`Deleted ${users.deletedCount} testing users (shelters)`) )
.then(
  Shelter.insertMany(shelters)
    .then( users => { console.log(`Created ${users.length} testing users (shelters)`)
                    mongoose.connection.close()} ))
.catch(err => console.log(`An error occurred seeding testing users (shelters) to the DB: ${err}`))

User.deleteMany()
.then( users => console.log(`Deleted ${users.deletedCount} testing users (admins)`) )
.then(
  User.insertMany(admins)
    .then( users => { console.log(`Created ${users.length} testing users (admins)`)
                    mongoose.connection.close()} ))
.catch(err => console.log(`An error occurred seeding testing users (admins) to the DB: ${err}`))
