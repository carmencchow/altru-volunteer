import express from "express";
import {
  getEvent,
  getEvents,
  editEvent,
  deleteEvent,
  attendEvent,
} from "../controllers/eventController.js";

const router = express.Router();

//eventRoute (localhost:5000/api/event)
router.get("/:id", getEvent);
router.get("/:district/:category", getEvents);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);
router.put("/:id/attend", attendEvent);

export default router;
