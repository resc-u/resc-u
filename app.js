require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

//connects to DB
require("./db");

// sessions
require("./config/session.config")(app);

// middleware
require("./config")(app);

// routers
const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

const usersRouter = require("./routes/users.routes");
app.use("/users", usersRouter);


const animalsRouter = require("./routes/animals.routes");
app.use("/animals", animalsRouter);
module.exports = app;

const sheltersRouter = require("./routes/shelters.routes");
app.use("/shelters", sheltersRouter);
module.exports = app;