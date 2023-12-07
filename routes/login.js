const express = require("express");
const session = require("express-session");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { User, Comment } = require("../models/forum.js");

router.use(bodyParser.json());

router.use(
  session({
    secret: "your-secret-key", // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const user = await User.findOne({ user_name });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatch) {
      // req.session.errorMessage = "Invalid username or password";
      req.session.error = true;
      return res.redirect("/login");
    }

    // if (passwordMatch === null) {
    //   req.session.errorMessage = "Invalid username or password";
    //   res.redirect("/login");
    // }

    // If the credentials are valid, set the user as authenticated in the session
    // req.session.user = user;
    req.session.user = {
      email: user.email,
      full_name: user.full_name,
      user_name: user.user_name,
      // Add other relevant user data as needed
    };

    res.redirect(`/home?user_name=${user.user_name}&email=${user.email}`);
  } catch (error) {
    console.error(error);
    // req.session.errorMessage = "Internal Server Error";
    // res.redirect("/login");
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
