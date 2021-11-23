const router = require("express").Router();

/* homepage */
router.route("/").get((req, res) => res.render("homepage"));

module.exports = router;
