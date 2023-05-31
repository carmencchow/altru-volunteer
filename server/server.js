import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { auth } from "./src/firebase-config.js";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ngoRoutes from "./routes/ngoRoute.js";
import Stripe from "stripe";
import authRoutes from "./routes/authRoute.js";
import eventRoutes from "./routes/eventRoute.js";
import stripeRoutes from "./routes/stripeRoute.js";
import userRoutes from "./routes/userRoute.js";
import Ngo from "./models/ngoModel.js";
import Event from "./models/eventModel.js";
import User from "./models/userModel.js";

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

// app.use(async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split("")[1];
//     if (!token) {
//       res.sendStatus(400);
//     }
//     const verifyToken = await auth.verifyIdToken(token);

//     const { email, uid } = verifyToken;
//     req.body = { ...req.body, email, uid };
//     next();
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// app.get("/", (req, res) => {
//   console.log(req.body);
//   res.send("Hello World");
// });

// app.post("/verify", async (req, res) => {
//   console.log(req.body);
//   res.sendStatus(200);
// });

// Routes
app.use("/api/ngos", ngoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/payment", stripeRoutes);

// Connect to db
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // server test
    server.listen(PORT, () => {
      console.log(`connected to db and listening on port', ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
