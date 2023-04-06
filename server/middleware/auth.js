const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
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
    // const decoded = jwt.verify(token, "randomString");
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};


// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// const protect = async (req, res, next) => { 
//   let token
//   console.log('protection')

//   // Check if JWT in the headers 
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { 

//     try {
//       // Get just the token from the header
//       token = req.headers.authorization.split(' ')[1]
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)
//       // Get user info (password removed) from the token and assign to req.user for use in any protected route
//       req.user = await User.findById(decoded._id).select('-password')
//       next()
//     } catch (err){
//       console.log(err)
//       res.status(404).send({ message: 'Not authorized' })      
//     }  
//   }

//     else {
//       res.status(401).send({ message: 'Not authorized, no token'})
//     }
//   }

// module.exports = { protect }
// // bearer token