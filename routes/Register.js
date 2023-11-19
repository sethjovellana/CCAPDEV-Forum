const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const app = express();

router.get("/", (req, res) => {
  res.render("Register");
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

router.route("/users").post(function (req, res) {
    const User = new user({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    user.save();
    res.json({ message: "Forum saved!" });
});

module.exports = router;
