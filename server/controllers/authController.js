const User = require('../models/userModel');
const mongoose = require('mongoose');

const register = async (req, res) => {
  try {
    // Create new User instance
    const newUser = new User(req.body)

    // Save user to MongoDB
    await newUser.save();
    res.status(200).send(body, 'User saved successfully');
  } catch(err) {
    res.status(500).send(err);
  }
}


const login = (req, res) => {
  try {

  } catch (err) { 

  }

}

const logout = (req, res) => {
  try {

  } catch (err) {

  }
}


module.exports = { register, login, logout };