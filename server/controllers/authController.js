const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { countDocuments } = require('../models/userModel');

// 1. signup endpoint
const signup = async (req, res) => {
  try {
    // Validate incoming request
    if (!req.body.username || !req.body.password || !req.body.email){
      res.status(404).send({ message: 'Please complete all required fields'});
      return;
    }

    // Hash the password before saving email and password into the database
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // Create a new user instance and collect the data
    const newUser = new User(req.body) 
    // const newUser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
      // password: hashedPassword,
    //   image: req.body.image
    // });

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username: req.body.username.toLowerCase()});
    if (existingUser){
      res.status(404).send({ message: 'User name already exists, please enter a different username'});
    } 

    await newUser.save();
    res.status(200).send({ message: 'New user saved to database' }); 
  
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Error creating user' });
    };
  };

  // 2. LOGIN endpoint
  const login = async (req, res) => {
    // Hash the password before saving email and password into the database
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    try {
      // Validate incoming request body
      if (!req.body.username || !req.body.password){
        res.status(400).send({ message: 'Username or password missing'});
      }

      // Find user with the given username
      const user = await User.findOne({ username: req.body.username.toLowerCase() });
      if (!user) return res.status(404).send({ message: 'User not found' });

      // Validate incoming password against hashed password
      const isPasswordValid = await bcrypt.compare(req.body.password, hashedPassword)
      console.log(req.body.password, hashedPassword);
        
      if (!isPasswordValid){
        res.status(400).send({ message: 'Invalid username or password', err});
      }

      // Create a JWT token for the authenticated user
      const token = jwt.sign({
        "id": user._id,
        "username": user.username,
        "email": user.email
      }, process.env.JWT_SECRET, { expiresIn: '20s' }) 

      // Create cookie with token
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      // Send accessToken containing username 
      res.status(200).send({ message: 'Sending TOKEN', data: token });
      
    } catch (err) {
      console.log(err); 
      res.status(500).send({ message: 'Login failed', err});
    }
  };

// 3. LOGOUT endpoint
const logout = ( req, res ) => {
  try {
    // remove JWT
    res.clearCookie('jwt');
    res.json({ message: 'Logout successful'});  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Logout failed', err})
  }
}


module.exports = { signup, login, logout };