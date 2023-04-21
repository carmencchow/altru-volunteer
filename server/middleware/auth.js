const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  const authHeader = req.header.authHeader;
  if (!authHeader) {
    console.log("Missing Authorization Header");
    return res.status(401).json({ message: "Auth Error" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Invalid token");
    return res.status(401).json({ message: "Auth Error" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};

module.exports = auth 
