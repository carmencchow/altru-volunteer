import express from "express";
import {
  getEvent,
  getEvents,
  getRecentEvents,
  editEvent,
  deleteEvent,
  registerEvent,
  removeEvent,
} from "../controllers/eventController.js";

const router = express.Router();

//eventRoute (localhost:5000/api/event)
router.get("/recent", getRecentEvents);
router.get("/:id", getEvent);
router.get("/:district/:category", getEvents);
router.put("/:id", editEvent);
router.delete("/:id", deleteEvent);
router.put("/:id/register", registerEvent);
router.put("/:id/remove", removeEvent);

export default router;
