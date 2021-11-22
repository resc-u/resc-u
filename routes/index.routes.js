const router = require("express").Router();

/* homepage */
router.route("/").get((req, res) => res.render("homepage"));

/* logout */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.render("index", { message: "You are logged out!" });
  });
});

module.exports = router;
