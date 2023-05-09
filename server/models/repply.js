const mongoose = require("mongoose");

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const repplySchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  mail: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Mail",
  },
  to: {
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
});

module.exports = mongoose.model("Repply", repplySchema); //returns a constructor function
