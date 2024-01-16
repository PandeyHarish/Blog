const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { Article } = require("../model/blogsModel");
const multer = require("multer");

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
  //   body("category", "Enter a valid category with at least 4 characters.").isLength({ min: 4 }),
  //   body("tag", "Enter a proper tag with at least 3 characters.").isLength({ min: 3 }),
];

// POST endpoint to create a new article with validations
router.post("/create", upload.single("image"), articleValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, author, tag, category } = req.body; //, category, tag

    // Check if a file was provided
    const imageUrl = req.file ? req.file.filename : null;

    // Create a new article based on the Article model
    const newArticle = await Article.create({
      title,
      content,
      author, // passing the author's ID
      category,
      tag,
      imageUrl, // Add the image URL to the article
    });

    res.status(201).json({ article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
