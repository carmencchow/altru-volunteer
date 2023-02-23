const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

// Register endpoint
const register = async (req, res) => {
  try {
    // Hash the password before saving email and password into the database
    const hashedPassword = bcrypt.hash(req.body.password);

    // create a new user instance and collect the data
    const newUser = new User(req.body
      // {
      //   username: req.body.username,
      //   email: req.body.email,
      //   password: hashedPassword,
      //   image: req.body.image
      // }
    );
    
    // Save new user to database
    await newUser.save();
    
    res.status(200).send({ message: 'New user saved to database' }); 
    // if the new user wasn't added successfully to the database:
  } catch (err) {
    res.status(500).send({ message: 'Error creating user' });
  };
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send({ message: 'User not found' });

    const isValid = await User

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