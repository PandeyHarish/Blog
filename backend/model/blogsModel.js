const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Article = mongoose.model("Article", articleSchema);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Tag = mongoose.model("Tag", tagSchema);

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Article, Category, Tag, Comment };
