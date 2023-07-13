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
  getDonations,
} from "../controllers/ngoController.js";

const router = express.Router();

//ngoRoute (localhost:5000/api/ngo)
router.get("/:id/events", getNgoEvents);
router.get("/:id/donations", getDonations);
router.post("/follow/:id", followNgo);
router.put("/unfollow/:id", unfollowNgo);
router.post("/:id/event", createEvent);
router.get("/:id", getNgo);
router.put("/:id", editNgo);
router.get("/:district/:category", getNgos);
router.post("/", createNgo);

export default router;
