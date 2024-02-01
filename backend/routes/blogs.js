const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { Article } = require("../model/blogsModel");
const multer = require("multer");
const fetchuser = require("../middleware/fetchuser");
const fs = require("fs");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Validation middleware for creating an article
const articleValidation = [
  body("title", "Enter a valid title.").isLength({ min: 3 }),
  body("content", "Please enter a description with at least 20 characters.").isLength({ min: 2 }),
  body("category", "Enter a valid category with at least 4 characters.").isLength({ min: 4 }),
  body("tag", "Enter a proper tag with at least 3 characters.").isLength({ min: 3 }),
];

// POST: endpoint to create a new article with validations
router.post("/create", upload.single("image"), articleValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, author, tag, category, author_name } = req.body;

    // Check if a file was provided
    const imageUrl = req.file ? req.file.filename : null;
    const date = new Date();
    const dateTime = date.toISOString();

    // Create a new article based on the Article model
    const newArticle = await Article.create({
      title,
      content,
      author, // passing the author's ID
      category,
      author_name,
      tag,
      imageUrl, // Add the image URL to the article
      dateTime,
    });

    res.status(201).json({ article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// end point to fetch articles using: GET
router.get("/fetcharticles", async (req, res) => {
  try {
    const blogs = await Article.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// End point to fetch user specific articles using: POST
router.post("/fetchuserblogs", fetchuser, async (req, res) => {
  try {
    const blogs = await Article.find({ user: req.user._id });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching Blogs:", error.message);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// End point to fetch specific article according to click using: GET
router.get("/view/:id", async (req, res) => {
  try {
    // id has been sent in the params and read to fetch the arcticle with that id
    const blog = await Article.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// End point to delete specific article using: DELETE
router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Article.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to delete this blog" });
    }

    // Retrieve the path of the image
    const imageUrl = blog.imageUrl; // Replace with the actual field name storing the image path

    // Construct the absolute path to the image file
    const imagePath = path.join(__dirname, "public", imageUrl.replace("/images/", ""));

    // Delete the image file from the device
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    blog = await Article.findByIdAndDelete(req.params.id);
    res.json({ success: "The blog has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
