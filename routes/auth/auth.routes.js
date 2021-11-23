const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const Adopter = require("../../models/Adopter.model");
const Shelter = require("../../models/Shelter.model");

const isNotLoggedIn = require("../../middleware/isNotLoggedIn");

/* login */
router.post("/login", isNotLoggedIn, async (req, res) => {
  let error = null;
  let message = "";

  try {
    const { email, password } = req.body;
    // if one of the fields is missing
    if (!email || !password)
      res.render("homepage", {
        error: { type: "CREDENTIALS_ERROR", message: "Invalid credentials" },
      });

    const loggedInUser = await User.findOne({ email });
    if (!loggedInUser)
      res.render("homepage", {
        error: { type: "USER_ERROR", message: "User doesn't exist!" },
      });

    const isPwdCorrect = await bcrypt.compare(password, loggedInUser.password);

    if (isPwdCorrect) {
      req.session.loggedInUser = loggedInUser;
      console.log("LOGGED IN USER =====> ", req.session.loggedInUser);
      message = "You are logged in!";

      switch (loggedInUser.usertype) {
        case "Adopter":
          res.send("Adopter home page");
          break;
        case "Shelter":
          res.send("Shelter home page");
          break;
        case undefined:
          res.send("Admin home page");
          break;
        default:
          res.redirect("/");
          break;
      }
    } else {
      message = "Password is incorrect!";
      error = { type: "USER_ERROR", message };
      res.redirect("/");
    }
  } catch (e) {
    error = { errType: "DB_ERR", message: e };
  }
});

/* signup */
router
  .route("/signup")
  .get(isNotLoggedIn, (req, res) => res.render("auth/signup-form"))
  .post(async (req, res) => {
    let error = null;
    let newUser = null;
    const { username, email, password, role } = req.body;

    try {
      // user didn't fill all the fields
      if (!username || !email || !password || !role) {
        res.render("auth/signup", {
          username,
          email,
          role,
          error: {
            type: "CREDENTIALS_ERROR",
            message: "All fields are required!",
          },
        });
      }

      const user = await User.findOne({ email });

      // correct signup
      if (!user) {
        // encryption
        const salt = bcrypt.genSaltSync(4);
        const hashedPwd = bcrypt.hashSync(password, salt);

        if (role === "adopter") {
          newUser = await Adopter.create({
            username,
            email,
            role,
            password: hashedPwd,
          });
        } else if (role === "shelter") {
          console.log("here");
          newUser = await Shelter.create({
            username,
            email,
            role,
            password: hashedPwd,
          });
        }
        // redirect to profile
        res.redirect("/users/profile");
      } else {
        // user already exists
        res.render("auth/signup", {
          username,
          email,
          role,
          error: { type: "USER_ERROR", message: "This user already exists!" },
        });
      }
    } catch (e) {
      error = { errType: "DB_ERR", message: e };
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
