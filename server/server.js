// (1) ES6 module imports --- (package.json type "module") -------
// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import http from "http";
// import Stripe from "stripe";
// import mongoose from "mongoose";
//// import bodyParser from "body-parser";
//// import cookieParser from "cookie-parser";
// import { auth } from "./src/firebase-config.js";
// import ngoRoutes from "./src/routes/ngoRoute.js";
// import authRoutes from "./src/routes/authRoute.js";
// import stripeRoutes from "./src/routes/stripeRoute.js";
// import userRoutes from "./src/routes/userRoute.js";

// Add Stripe key
// const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

// (2) CommonJS require --- (package.json type "commonjs") -------
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
// const stripe = require("stripe");
const mongoose = require("mongoose");
// require("bodyParser") = require("bodyParser");
const { auth } = require("./src/firebase-config.cjs");
const ngoRoutes = require("./src/routes/ngoRoute.js");
const authRoute = require("./src/routes/authRoute.js");
const stripeRoutes = require("./src/routes/stripeRoute");
const userRoutes = require("./src/routes/userRoute.js");

// Add Stripe key
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

// Express app
// dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

// Middleware
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(async (req, res, next) => {
  try {
    console.log("Headers", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.sendStatus(400);
    }
    const verifyToken = await auth.verifyIdToken(token);
    const { email, uid } = verifyToken;
    req.body = { ...req.body, email, uid };
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Routes
app.use("/api/ngo", ngoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/payment", stripeRoutes);

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`connected to db and listening on port', ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
