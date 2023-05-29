import express from "express";
import { getEvent, createEvent } from "../controllers/eventController.js";
// const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", getEvent);
router.post("/", createEvent);

export default router;
