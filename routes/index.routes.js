const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("home page");
});

module.exports = router;
