const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../model/usersModel");

const router = express.Router();

// Route 1: Route to create a new user using post
router.post(
  "/createuser",
  [
    body("username", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Enter a valid password (minimum 5 characters).").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ $or: [{ email }, { username }] });

      if (user) {
        if (user.email === email) {
          return res.status(400).json({ message: "Email already exists" });
        } else {
          return res.status(400).json({ message: "Username already exists" });
        }
      }

      user = new User({
        username,
        email,
        password,
      });

      await user.save();

      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
