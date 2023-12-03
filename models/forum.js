const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: String,
  comment: String,
});

const UserSchema = new mongoose.Schema({
  profile_photo: String,
  full_name: String,
  user_name: String,
  email: String,
  password: String,
});

module.exports = {
  User: mongoose.model("User", UserSchema),
  Comment: mongoose.model("Comment", commentSchema),
};
