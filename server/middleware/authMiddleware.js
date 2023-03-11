const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => { 
  let token

  // Check if JWT in the headers 
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
    try {
      // Get just the token from the header
      token = req.headers.authorization.split(' ')[1]
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user (without password) from the token and assign to req.user for use in any protected route
      req.user = await User.findById(decoded._id).select('-password')
      next()
    } catch (err){
      console.log(err)
      res.status(404).send({ message: 'Not authorized' })      
    }
    
    if (!token){
      res.status(401).send({ message: 'Not authorized, no token'})
    }
  }

module.exports = { protect }
// bearer token