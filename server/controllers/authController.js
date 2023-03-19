const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// 1. REGISTER endpoint
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // a) Validate incoming request
    if (!username || !password || !email){
      res.status(400).send({ message: 'Please complete all required fields'});
      return;
    }

    // b) Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists){
      res.status(400).send({ message: 'Email already exists. Please login instead.'});
    } 

    // c) Hash the password before saving email and password into the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // d) Create a new user instance and collect the data
    const newUser = new User(req.body) 
  // const newUser = new User({
      // username: req.body.username,
      // email: req.body.email,
      // password: hashedPassword,
      // image: req.body.image
    // })

    // e) Save user and return data to user
    await newUser.save();

    res.status(200).send({ 
      message: 'New user saved to database', 
      username, 
      email, 
      token: createToken(newUser._id) 
    }); 
  
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Invalid user data. User not saved' });
    };
  };

  // 2. LOGIN endpoint
  const login = async (req, res) => {
    // Hash the password before saving email and password into the database
    
    try {
      console.log(req.body.password);
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
    
      // Validate incoming request body
      if (!req.body.email || !req.body.password){
        res.status(400).send({ message: 'Email or password missing'});
        return;
      }

      // Check for user email
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(404).send({ message: 'User not found. Please enter the correct email and password' });

      // Validate incoming password against hashed password
      const isPasswordValid = await bcrypt.compare(req.body.password, hashedPassword)
 
      if (!isPasswordValid){
        res.status(400).send({ message: 'Invalid username or password', err});
      }

      res.status(200).send({ 
        message: 'User login successful', 
        username: req.body.username, 
        email: req.body.email,
        token: createToken(user._id) 
      }); 

    } catch (err) {
      console.log(err); 
      res.status(500).send({ message: 'Login failed', err});
    }
  };

  // Generate JWT token
  const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { 
      expiresIn: '7d',
    })
  }

// Create cookie with token
    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000
    // })

// 3. LOGOUT endpoint
const logout = ( req, res ) => {
  try {
    // send JWT and then remove 
    res.clearCookie('jwt');
    res.json({ message: 'Logout successful'});  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Logout failed', err})
  }
}

// 4. GETME endpoint, access by passing user token in 'auth'
const getMe = async ( req, res ) => { 
  const {_id, username, email } = await User.findById(req.user.id);
  res.status(200).send({ 
    message: 'User data display',
    id: _id,
    username,
    email
  })
}

module.exports = { signup, login, logout, getMe };