const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const commentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: String,
  comment: String,
});

const UserSchema = new Schema({
  profile_photo: String,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
});

const Comment = model("Comment", commentSchema);
const User = model("User", UserSchema);

module.exports = {
  Comment,
  User,
};
