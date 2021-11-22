require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

//connects to DB
require("./db");

// middleware
require("./middleware")(app);

const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// routers
const indexRouter = require("./routes/index.routes");
app.use("/", indexRouter);

const usersRouter = require("./routes/users.routes");
app.use("/users", usersRouter);


const animalsRouter = require("./routes/animals.routes");
app.use("/animals", animalsRouter);
module.exports = app;
