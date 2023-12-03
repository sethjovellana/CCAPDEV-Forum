const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models/forum.js");
const app = express();

router.get("/", (req, res) => {
  res.render("Register");
});

router.post("/register", async (req, res) => {
  try {
    const { profile_photo, full_name, user_name, email, password } = req.body;

    // Create a new instance of the User
    const newUser = new User({
      profile_photo: profile_photo,
      full_name: full_name,
      user_name: user_name,
      email: email,
      password: password,
    });

    await newUser.save();

    res.json({ message: "User created" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.route("/user/:id").get(async (req, res) => {
  try {
    const fetchedUser = await User.findById(req.params.id);
    res.json(fetchedUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.route("/users").get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
