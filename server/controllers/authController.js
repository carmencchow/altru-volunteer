import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { auth } from "../src/firebase-config.js";

// SIGNUP - Save FirebaseUID to MongoDB
export const verifyUser = async (req, res) => {
  try {
    // if no user
    const { uid } = req.body;
    // find user in MongoDB with uid
    const user = await User.findById(uid);
    if (!user) {
      await auth.deleteUser(uid);
      console.log("User not found. User deleted from Firebase");
      return res.sendStatus(401);
    }
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

// CREATE
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
    return res.status(200).json({ msg: "User", newUser });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// LOGIN -
