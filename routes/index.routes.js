const isNotLoggedIn = require("../middleware/isNotLoggedIn");

const router = require("express").Router();

/* homepage */
router.route("/").get(isNotLoggedIn, (req, res) => res.render("homepage"));

module.exports = router;
