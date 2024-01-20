const express = require("express");
// this is dotenv config imoirt to access environment variables
require("dotenv").config();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const User = require("../model/usersModel");
const Admin = require("../model/adminModel");

const router = express.Router();

const secret = process.env.JWT_SECRET;

// Route 1: Route to create a new user using post
router.post(
  "/user/create",
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
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(password, salt);

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
        password: passHash,
      });

      await user.save();
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, secret);
      success = true;
      res.json({ authToken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: Route to create a new admin using post

// router.post(
//   "/admin/create",
//   [
//     body("username", "Enter a valid name.").isLength({ min: 3 }),
//     body("email", "Enter a valid email.").isEmail(),
//     body("password", "Enter a valid password (minimum 5 characters).").isLength({ min: 5 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { username, email, password } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const passHash = await bcrypt.hash(password, salt);

//     try {
//       let admin = await Admin.findOne({ $or: [{ email }, { username }] });

//       if (admin) {
//         if (admin.email === email) {
//           return res.status(400).json({ message: "Email already exists" });
//         } else {
//           return res.status(400).json({ message: "Username already exists" });
//         }
//       }

//       admin = new Admin({
//         username,
//         email,
//         password: passHash,
//       });

//       await admin.save();
//       const data = {
//         admin: {
//           id: admin.id,
//         },
//       };

//       const authToken = jwt.sign(data, secret);
//       success = true;
//       res.json({ authToken, success });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// Route 3: Route to login a user using post
router.post(
  "/user/login",
  [body("identifier", "Please enter a valid email or username").exists(), body("password", "Password cannot be empty").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ errors: errors.array() });
    }

    const { identifier, password } = req.body;
    try {
      // can login using email or username
      let user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Login with proper credentials", success });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ error: "Login with proper credentials", success });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);
      success = true;
      res.json({ authToken, success });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 4: Route to login a admin using post
// router.post(
//   "/admin/login",
//   [body("identifier", "Please enter a valid email or username").exists(), body("password", "Password cannot be empty").exists()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     let success = false;
//     if (!errors.isEmpty()) {
//       success = false;
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { identifier, password } = req.body;
//     try {
//       // can login using email or username
//       let admin = await Admin.findOne({ $or: [{ email: identifier }, { username: identifier }] });
//       if (!admin) {
//         success = false;
//         return res.status(400).json({ error: "Login with proper credentials", success });
//       }

//       const passwordCompare = await bcrypt.compare(password, admin.password);
//       if (!passwordCompare) {
//         success = false;
//         return res.status(400).json({ error: "Login with proper credentials", success });
//       }

//       const data = {
//         admin: {
//           id: admin.id,
//         },
//       };
//       const authToken = jwt.sign(data, secret);
//       success = true;
//       res.json({ authToken, success });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// Route 5: Fetch information about the logged-in user
router.post("/user/getuser", fetchuser, async (req, res) => {
  try {
    // Fetch user information from the database based on the ID in req.user.id
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
