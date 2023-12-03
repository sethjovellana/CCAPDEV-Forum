const express = require('express');
const router = express.Router();
const comment = require("../models/forum.js");
const app = express();


router.get('/', (req, res) => {
    res.render("ForumPosts");
})

router.route("/comment/:id").get(function (req, res) {
    comment.findById(req.params.id).then((comment) => {
        res.json(comment);
        res.end();
    });
});

router.route("/comments").get(function (req, res) {
    comment.find().then((comment) => {
        res.json(comment);
        res.end();
    });
});

router.route("/comments").post(function (req, res) {
    const Comment = new comment({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
    });
    comment.save();
    res.json({ message: "Forum saved!" });
});


module.exports = router;
