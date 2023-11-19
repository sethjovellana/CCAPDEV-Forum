const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
// const user = require("C:\Users\LENOVO\Documents\ForumDesign\CCAPDEV-Forum\models\user.js");

router.get("/", (req, res) => {
  res.render("MyProfile");
});

module.exports = router;
