import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Save FirebaseUID to MongoDB
export const createUser = async (req, res) => {
  try {
    const userId = req.body.firebaseUID;
    console.log(userId);
    // Create new user doc in MongoDB with firebaseUID
    const user = await new User({
      _id: userId,
      firstname,
      lastname,
      email,
      password,
      following: [],
      donations: [],
      attending: [],
    });
    await user.save();
  } catch (error) {
    res.status(400).send("Error: ", error);
    console.log(error);
  }
};

// 1. REGISTER endpoint
// const signup = async (req, res) => {
//   try {
//     const { email, password, firstname, lastname } = req.body;
//     if (!(email && password && firstname && lastname)) {
//       res.status(400).send("Fill in all required fields");
//     }
//     const isUser = await User.findOne({
//       email,
//     });
//     if (isUser) {
//       return res.status(400).send("User already exists");
//     }

//     // const salt = await bcrypt.genSalt(10);
//     // const newPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       firstname,
//       lastname,
//       email,
//       password,
//       // password: newPassword,
//       following: [],
//       donations: [],
//       attending: [],
//       _id: firebaseUID,
//     });

//     // console.log("Salt is:", user.password);
//     await user.save();

//     // Generate and send token to user
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "3d",
//       }
//     );
//     res.status(201).json({ user, token });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Error in saving");
//   }
// };

// 2. LOGIN endpoint
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email, password);

//     if (!(email && password)) {
//       res.status(400).send("Email and password are required");
//     }
//     let user = await User.findOne({ email, password })
//       .populate("attending")
//       .populate("donations");
//     console.log("Logging in user:", user.password);
//     res.status(200).json({ message: "signed in", user });
//     // if (!user)
//     // res.status(400).json({
//     //   message: "User does not exist. Email or password incorrect",
//     // });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// 3. LOGOUT endpoint
// const logout = (req, res) => {
//   try {
//     res.clearCookie("jwt");
//     res.json({ message: "Logout successful" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Logout failed", err });
//   }
// };
