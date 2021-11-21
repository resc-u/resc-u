require("dotenv/config");
// require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

// middleware
require("./middleware")(app);

// routers
const index = require("./routes/index.routes");

//route handling
app.use("/", index);

module.exports = app;
