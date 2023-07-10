import express from "express";
import {
  createNgo,
  getNgo,
  getNgos,
  editNgo,
  followNgo,
  unfollowNgo,
  getAllNgoEvents,
  createEvent,
  editEvent,
  deleteEvent,
} from "../controllers/ngoController.js";

const router = express.Router();

//ngoRoute (localhost:5000/api/ngo)
router.post("/", createNgo);
router.get("/:id", getNgo);
router.put("/:id", editNgo);
router.get("/:district/:category", getNgos);
router.post("/follow/:id", followNgo);
router.delete("/unfollow/:id", unfollowNgo);
router.post("/:id/event", createEvent);
router.get("/:id/events", getAllNgoEvents);
router.put("/:id/event/:eventId", editEvent);
router.delete("/:id/event/:eventId", deleteEvent);

export default router;
