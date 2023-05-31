import express from "express";
import { signup, login, logout, setId } from "../controllers/authController.js";
// import { setId } from "../controllers/authController.js";

const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

router.post("/createUser", createUser);

export default router;
