const express = require('express');
const User = require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// 1. REGISTER endpoint
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)){
      res.status(400).send('Fill in all required fields')
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    
    user = await User.create({
      username,
      email,
      password,
      // password: salt,
      following: [],
      donations: [],
      attended: [],
    });
        await user.save();

    // Generate and send token to user
    const token = jwt.sign(
      { id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      },
    );
    user.token = token;
    // user.password = undefined; // password will not be sent to the frontend
    res.status(201).json(user, token)

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error in saving");
  }
};

// 2. LOGIN endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send('Email and password are required')
    }
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User does not exist",
      });

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) {
    //   return res.status(400).json({
    //     message: "Incorrect email or password",
    //   });
    // }

    const token = jwt.sign({ 
        id: user._id, 
        email
      },
        process.env.JWT_SECRET,
      { 
        expiresIn: "2h" 
      });
      user.token = token
      // user.password = undefined
    // }

    // Store token in cookie and send to client
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        }

      res.status(200).cookie("token", token, options).json({    
        success: true,
        token,
        user
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };

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