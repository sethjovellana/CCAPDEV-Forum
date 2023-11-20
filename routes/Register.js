const express = require("express");
const router = express.Router();
const user = require("../models/forum.js");
const app = express();

router.get("/", (req, res) => {
  res.render("Register");
});


router.post("/register", async (req, res) => {
  try {
    const newUser = {
      profilePhoto: req.body.profile_photo,
      fullName: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    await newUser.save();
    res.json({ message: "User created" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.route("/user/:id").get(function (req, res) {
  user.findById(req.params.id).then((user) => {
    res.json(user);
    res.end();
  });
});

router.route("/users").get(function (req, res) {
  user.find().then((user) => {
    res.json(user);
    res.end();
  });
});

// router.route("/users").post(function (req, res) {
//   const User = new user({
//     profilePhoto: req.body.profile_photo,
//     fullName: req.body.name,
//     username: req.body.username,
//     username: req.body.email,
//     password: req.body.password,
//   });
//   res.json({ message: "user created" });
// });

module.exports = router;
