const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { response } = require('express');

// Register endpoint
const register = async (req, res) => {
  try {
    // Hash the password before saving email and password into the database
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // create a new user instance and collect the data
    const newUser = new User(req.body) 
    
    // const newUser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hashedPassword,
    //   image: req.body.image
    // });

    const existingUser = await User.findOne({ username: req.body.username.toLowerCase()});
    // const existingUser = await User.findOne({ username: newUser.username })
    if (existingUser){
      res.status(404).send({ message: 'User name already exists, please enter a different username'});
    } else {    
    await newUser.save();
    res.status(200).send({ message: 'New user saved to database' }); 
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error creating user' });
  };
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send({ message: 'User not found' });

    // hash the incoming password

    // validate the hashed password
    const isValid = await

    res.status(200).send({ message: 'User login successful' });

  } catch (err) { 
    res.status(500).send(err);
  }
};

const logout = (req, res) => {
  try {

  } catch (err) {

  }
}


module.exports = { register, login, logout };