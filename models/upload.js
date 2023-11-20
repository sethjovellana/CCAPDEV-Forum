const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const uploadSchema = new Schema({
    title: { type: String },
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    content: { type: String },
    image: { type: String },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', autopopulate: true }],
    // upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
    // downvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true }],
    // voteCtr: { type: Number },
    // comCtr: { type: Number },
    // edited: { type: Boolean, default: false }
});

const upload = model('upload', uploadSchema);

module.exports = upload;

