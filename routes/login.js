const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { User, Comment } = require("../models/forum.js");

const app = express();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      req.session.errorMessage = "Invalid username or password";
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      req.session.errorMessage = "Invalid username or password";
      //return res.redirect("/login");
      window.location.href = "login";
    }

    // If the credentials are valid, set the user as authenticated in the session
    req.session.user = user;
    // return res.redirect("/home");
    window.location.href = "home";
  } catch (error) {
    console.error(error);
    req.session.errorMessage = "Internal Server Error";
    // return res.redirect("/login");
    window.location.href = "login";
  }
});

module.exports = router;
