import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import Stripe from "stripe";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { auth } from "./src/firebase-config.js";
import ngoRoutes from "./src/routes/ngoRoute.js";
import authRoutes from "./src/routes/authRoute.js";
import stripeRoutes from "./src/routes/stripeRoute.js";
import userRoutes from "./src/routes/userRoute.js";

// Add Stripe key
const stripe = new Stripe(
  "sk_test_51L1kSgAoNhpouPlc5TPMmmk909SS97lPmaWnmSwz9dcGGgHGYlGES61londP5sfbmYNQ9Xt7SsN6tWsKrjfLrYDe00StwbT4sw"
);

// Express app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use("/api/auth", authRoutes);
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
