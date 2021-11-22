const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Adopter = require("../models/Adopter.model");
const Shelter = require("../models/Shelter.model");

/* /signup sister routes */
router
  .route("/signup")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    let error = null;
    let newUser = null;
    let { username, email, password, role } = req.body;

    try {

      // user didn't fill all the fields
      if (!username || !email || !password || !role) {
        res.render("signup", {
          username, email, role,
          error: { 
            type: "CREDENTIALS_ERROR", message: "All fields are required!",
          },
        });
      }

      const user = await User.findOne({ email })

      // user already exists
      if (user)
        res.render("signup", {
          username, email, role,
          error: { type: "USER_ERROR", message: "This user already exists!" },
        });

      const salt = bcrypt.genSaltSync(4);
      const hashedPwd = bcrypt.hashSync(password, salt);

      // redirect to Profile pages    
      if (role === "adopter") {

        newUser = await Adopter.create({ username, email, role, password: hashedPwd });
        if (newUser) res.redirect(`/users/profile/adopter/${newUser.id}`)

      } else if (role === "shelter") {

        newUser = await Shelter.create({ username, email, role, password: hashedPwd });
        if (newUser) res.redirect(`/users/profile/shelter/${newUser.id}`)

      }

      // otherwise, we render signup again
      res.render("signup", { username, email, role, error: { type: "DB_ERROR", message: "Error in the DB" }});
  
    } catch (e) {   
      error = { errType: "DB_ERR", message: e };
    }
  });

/* GET index (login) sister routes */
router
  .route("/")
  .get((req, res) => {
    res.render("index");
  })
  .post(async (req, res) => {
    let loggedInUser = null;
    let error = null;
    let message = "";

    try {
      const { email, password } = req.body;
      if (!email || !password)
        res.render("index", {
          error: { type: "CREDENTIALS_ERROR", message: "Wrong credentials!" },
        });

      loggedInUser = await User.findOne({ email });
      if (!loggedInUser)
        res.render("index", {
          error: { type: "USER_ERROR", message: "User doesn't exists!" },
        });

      let isPwdCorrect = bcrypt.compareSync(password, loggedInUser.password);

      if (isPwdCorrect) {
        req.session.loggedInUser = loggedInUser;
        console.log("LOGGED IN USER =====> ", req.session.loggedInUser);
        message = "You are logged in!";
      } else {
        message = "Password is incorrect!";
        error = { type: "USER_ERROR", message };
      }

      if (loggedInUser.role === "adopter") {
        res.redirect(`/users/profile/adopter/${loggedInUser.id}`)
      } else if (loggedInUser.role === "shelter") {
        res.redirect(`/users/profile/shelter/${loggedInUser.id}`)
      }
      //else if (loggedInUser.role === "admin") res.redirect('/users/admin/control-panel')

    } catch (e) {
      error = { errType: "DB_ERR", message: e };
    }
  });

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect("/");
    else res.redirect("/");
  });
});

module.exports = router;