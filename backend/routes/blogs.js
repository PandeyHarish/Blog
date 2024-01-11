const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { Article } = require("../model/blogsModel");

// Validation middleware for creating an article
const articleValidation = [
  body("title", "Enter a valid title.").isLength({ min: 3 }),
  body("content", "Please enter a description with at least 20 characters.").isLength({ min: 20 }),
  body("category", "Enter a valid category with at least 4 characters.").isLength({ min: 4 }),
  body("tag", "Enter a proper tag with at least 3 characters.").isLength({ min: 3 }),
];

// POST endpoint to create a new article with validations
router.post("/create", articleValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, author, category, tag } = req.body;

    // Create a new article based on the Article model
    const newArticle = await Article.create({
      title,
      content,
      author, // passing the author's ID
      category, 
      tag, 
    });

    res.status(201).json({ article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
