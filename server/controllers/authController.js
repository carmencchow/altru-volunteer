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
    const userEmail = req.body.email;
    console.log("Firebase UID:", userId, userEmail);
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    // Create new user doc in MongoDB with firebaseUID
    const newUser = await User.create({
      _id: userId,
      firstname,
      lastname,
      email: userEmail,
      following: [],
      donations: [],
      attending: [],
    });
    await newUser.save();
    console.log("New user", newUser);
    res.status(200).json({ msg: "User", newUser });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};
