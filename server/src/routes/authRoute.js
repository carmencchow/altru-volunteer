import express from "express";
import { createUser, verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/createUser", createUser);
router.get("/verifyUser", verifyUser);

export default router;
