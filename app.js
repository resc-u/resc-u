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

const authRouter = require("./routes/auth/auth.routes");
app.use("/auth", authRouter);

const usersRouter = require("./routes/users/users.routes");
app.use("/users", usersRouter);

const adoptersRouter = require("./routes/users/adopters.routes");
app.use("/adopters", adoptersRouter);

const animalsRouter = require("./routes/animals/animals.routes");
app.use("/animals", animalsRouter);

const sheltersRouter = require("./routes/users/shelters.routes");
app.use("/shelters", sheltersRouter);

module.exports = app;
