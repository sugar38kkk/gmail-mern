const mongoose = require("mongoose");

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const maillSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  isDraft: {
    type: Boolean,
    default: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Mail", maillSchema); //returns a constructor function
