import express from "express";
import { createUser, verifyUser } from "../controllers/authController.js";

// const express = require("express");
// const { createUser, verifyUser } = require("../controllers/authController.js");

const router = express.Router();

router.post("/createUser", createUser);
router.get("/verifyUser", verifyUser);

export default router;
// module.exports = router;
