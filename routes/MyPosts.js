const express = require('express');
const router = express.Router();
const upload = require("../models/upload.js");
const app = express();


router.get('/', (req, res) => {
    res.render("MyPosts");
})

router.route("/upload/:id").get(function (req, res) {
    upload.findById(req.params.id).then((upload) => {
        res.json(upload);
        res.end();
    });
});

router.route("/uploads").get(function (req, res) {
    upload.find().then((upload) => {
        res.json(upload);
        res.end();
    });
});

router.route("/uploads").post(function (req, res) {
    const Upload = new upload({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    });
    upload.save();
    res.json({ message: "Forum saved!" });
});

module.exports = router;