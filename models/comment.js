const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const commentSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
  content: { type: String },
  comment_id: { type: Number, required: true, unique: true },
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      autopopulate: true,
    },
  ],
  voteCtr: { type: Number },
});

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
