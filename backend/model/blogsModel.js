const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tag: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

const Article = mongoose.model("Article", articleSchema);

// const commentSchema = new mongoose.Schema({
//   content: { type: String, required: true },
//   article: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// });

// const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Article };
