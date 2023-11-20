const express = require("express");
const router = express.Router();
const { Comment, User } = require("../models/forum.js");

router.get("/", (req, res) => {
  res.render("MyProfile");
});

//! edit profile
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
// const port = 3000;

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/usersDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// Import models

app.use(bodyParser.json());

// Get user profile
app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
//! endit profile end
module.exports = router;
