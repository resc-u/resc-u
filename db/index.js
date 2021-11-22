const mongoose = require("mongoose");

const uri = "mongodb+srv://user:pass@resc-u.okafj.mongodb.net/resc-u";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: "admin",
  pass: "1234",
};

mongoose.connect(uri, options);
const db = mongoose.connection;

// When successfully connected
db.once("connected", () => console.log("Database connection open"));

// When the connection is disconnected
db.on("disconnected", () => console.log("Database connection disconnected"));

// If the connection throws an error
db.on("error", (err) => console.error(`Database connection error: ${err}`));

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  db.close(() => {
    console.log("Database connection disconnected through app termination");
    process.exit(0);
  });
});