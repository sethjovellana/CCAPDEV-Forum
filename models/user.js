const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  // bio: { type: String },
  // profile_pic: { type: String },
  // postsMade: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: "Post", autopopulate: true },
  // ],
});

const user = model('user', userSchema);

module.exports = user;

