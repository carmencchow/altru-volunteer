import express from "express";
import { createUser, verifyUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/verifyUser", verifyUser);

export default router;
