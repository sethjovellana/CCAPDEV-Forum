const express = require("express");
const router = express.Router();
const upload = require("../models/forum.js");
const app = express();

router.get("/", (req, res) => {
  res.render("MyPosts");
});

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

// Get comments for a specific post
app.get("/comments/:post_id", async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const comments = await Comment.find({ post_id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to a post
app.post("/comments", async (req, res) => {
  const { post_id, name, comment } = req.body;

  const newComment = new Comment({
    post_id,
    name,
    comment,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment by ID
app.delete("/comments/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (deletedComment) {
      res.json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
