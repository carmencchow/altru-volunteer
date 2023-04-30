const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// 1. REGISTER endpoint
const signup = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("Fill in all required fields");
    }
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(password, salt);
    // console.log('Salt is:', user.password);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      // password: salt,
      following: [],
      donations: [],
      attending: [],
      calendar: [],
      host: [],
    });
    await user.save();

    // Generate and send token to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    // user.token = token;
    // user.password = undefined; // password will not be sent to the frontend
    // console.log(user);
    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error in saving");
  }
};

// 2. LOGIN endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("Email and password are required");
    }
    let user = await User.findOne({ email }).populate("attending");
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

    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    // user.token = token

    // Store token in cookie and send to client
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3. LOGOUT endpoint
const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Logout failed", err });
  }
};

module.exports = { signup, login, logout };
