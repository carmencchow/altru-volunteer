import express from "express";
import {
  getAllEvents,
  getFilteredEvents,
  getEventById,
} from "../controllers/eventController.js";

const router = express.Router();

//eventRoute (localhost:5000/api/event)
router.get("/:district/:category", getFilteredEvents);
router.get("/:id", getEventById);
router.get("/", getAllEvents);

export default router;
