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


// Function for up/down vote count
function upvote(element) {
  const postElement = element.closest('.table-row');

  const upvoteCountElement = postElement.querySelector('.upvote-count');
  const currentUpvotes = parseInt(upvoteCountElement.textContent);
  upvoteCountElement.textContent = currentUpvotes + 1;

}

function downvote(element) {
  const postElement = element.closest('.table-row');
  const downvoteCountElement = postElement.querySelector('.downvote-count');
  const currentDownvotes = parseInt(downvoteCountElement.textContent);
  downvoteCountElement.textContent = currentDownvotes - 1;
}


module.exports = router;
