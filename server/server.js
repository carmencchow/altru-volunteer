import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import Stripe from "stripe";
import mongoose from "mongoose";
import { auth } from "./src/firebase-config.js";
import ngoRoutes from "./src/routes/ngoRoute.js";
import eventRoutes from "./src/routes/eventRoute.js";
import authRoutes from "./src/routes/authRoute.js";
import stripeRoutes from "./src/routes/stripeRoute.js";
import userRoutes from "./src/routes/userRoute.js";
import imageRoute from "./src/routes/imageRoute.js";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const server = http.createServer(app);

// Middleware
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("tiny"));

app.use(async (req, res, next) => {
  try {
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
app.use("/api/event", eventRoutes);
app.use("/api/payment", stripeRoutes);
app.use("/api/image", imageRoute);

// ("use strict");

// const transporter = nodemailer.createTransport({
//   // host: "smtp.forwardemail.net",
//   // port: 465,
//   // secure: true,
//   service: "hotmail",
//   auth: {
//     user: "volunteer.connect@outlook.com",
//     pass: "adorel33",
//   },
// });

// async function main() {
// await transporter.sendMail({
//   // from: '"Admin" <volunteer.connect@outlook.com>',
//   from: `Volunteer Connect <${process.env.EMAIL}>`,
//   to: `${updatedUser.email}`,
//   subject: `${event} Registration`,
//   text: `TEST: Hi  Thanks for registering to the ${event.name}. Our volunteer coordinator will be in touch with you soon.`,
//   html: `<h3>Hi </h3>
//   <p>TEST: Thanks for registering to the ${event.name}. Our volunteer coordinator will be in touch with you soon.<p>Here are the event details:</p>
//   <div>
//     <p>Name: ${event.name}</p>
//     <p>Organization: ${event.ngo}</p>
//     <p>Location: ${event.location}</p>
//     <p>Date: ${event.date}</p>
//     <p>Time: ${event.startTime}-${event.endTime}</p>
//   </div>
//   <h2>We look forward to seeing you there!</h2>
//   <h2> Volunteer Toronto</h2>`,
// });
//   console.log("Message sent: %s", info.messageId);
// }

// main().catch(console.error);

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
