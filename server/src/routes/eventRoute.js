import express from "express";
import { getEvents } from "../controllers/eventController.js";

const router = express.Router();

//eventRoute (localhost:5000/api/event)
router.get("/:district/:category", getEvents);

export default router;
