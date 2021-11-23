const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Shelter = require("../models/Shelter.model");

const { isLoggedIn, isNotLoggedIn } = require("../middleware/userHelper");

/* login */
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;
    // if one of the fields is missing
    if (!email || !password)
      res.render("homepage", { error: { type: "CREDENTIALS_ERROR", message: "Invalid credentials" }});

    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser)
      res.render("homepage", { error: { type: "USER_ERROR", message: "User doesn't exist!" }});

    const isPwdCorrect = await bcrypt.compare(password, loggedInUser.password);

    if (isPwdCorrect) {
      req.session.loggedInUser = loggedInUser
      
      req.flash('info', 'You are logged in!')
      res.redirect("/users/profile");

    } else {

      req.flash('error', 'Password is incorrect!')
      res.redirect("/");
    }
  } catch (e) {
    req.flash('error', e, false)
    res.render("homepage", { error: { type: "USER_ERROR", message: e }})
  }
});

/* signup */
router
  .route("/signup")
  .get((req, res) => res.render("auth/signup-form"))
  .post(async (req, res) => {

    let newUser = null;
    const { username, email, password, role } = req.body;

    try {
      // user didn't fill all the fields
      if (!username || !email || !password || !role) {
        res.render("auth/signup", {
          username, email, role,  
          error: { type: "CREDENTIALS_ERROR", message: "All fields are required!" }
        });
      }

      const user = await User.findOne({ email });

      // correct signup
      if (!user) {
        // encryption
        const salt = bcrypt.genSaltSync(4);
        const hashedPwd = bcrypt.hashSync(password, salt);

        if (role === "adopter") {
          newUser = await Adopter.create({ username, email, role, password: hashedPwd });

        } else if (role === "shelter") {
          newUser = await Shelter.create({ username, email, role, password: hashedPwd });
        }

        // where is newUser used ???

        // redirect to profile
        res.redirect("/users/profile");

      } else {
        // user already exists
        res.render("auth/signup", {
          username, email, role,
          error: { type: "USER_ERROR", message: "This user already exists!" },
        });
      }
    } catch (e) {
      res.render("auth/signup", { error: { type: "USER_ERROR", message: e }})
    } 
  });

/* logout */
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.redirect("/");
  });
});

module.exports = router;
