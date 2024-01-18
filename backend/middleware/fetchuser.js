var jwt = require("jsonwebtoken");
// this is dotenv config imoirt to access environment variables
require("dotenv").config();

// Access JWT secret from environment variables

const secret = process.env.JWT_SECRET;

// get user form the jwt token and add id to req object
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }
  try {
    const data = await jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = fetchuser;
