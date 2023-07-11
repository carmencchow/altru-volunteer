import express from "express";
import {
  createNgo,
  getNgo,
  getNgos,
  editNgo,
  followNgo,
  unfollowNgo,
  getNgoEvents,
  getNgoEvent,
  createEvent,
  editEvent,
  deleteEvent,
  getDonations,
} from "../controllers/ngoController.js";

const router = express.Router();

//ngoRoute (localhost:5000/api/ngo)
router.get("/:id/events", getNgoEvents);
router.get("/:id/donations", getDonations);
router.get("/:id/event", getNgoEvent);
router.post("/follow/:id", followNgo);
router.delete("/unfollow/:id", unfollowNgo);
router.post("/:id/event", createEvent);
router.put("/:id/event/:eventId", editEvent);
router.delete("/:id/event/:eventId", deleteEvent);
router.get("/:id", getNgo);
router.put("/:id", editNgo);
router.get("/:district/:category", getNgos);
router.post("/", createNgo);

export default router;
