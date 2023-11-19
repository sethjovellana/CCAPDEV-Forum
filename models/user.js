const { Schema, SchemaTypes, model } = require('mongoose');


const UserSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  profile_pic: { type: String },
  postsMade: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", autopopulate: true },
  ],
});


const user = model('user', UserSchema);

module.exports = Candidate;

