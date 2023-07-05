import express from "express";
import {
  getUser,
  attendEvent,
  follow,
  unfollow,
  addNGOProfile,
  editNGOProfile,
  editUserProfile,
  addDonation,
  editGoal,
  createNGOEvent,
  editNGOEvent,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", editUserProfile);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);
router.post("/:id/attend-event", attendEvent);
router.post("/:id/event", createNGOEvent);
router.put("/:id/edit-event", editNGOEvent);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);
router.post("/:id/addNgo", addNGOProfile);
router.put("/:id/editNgo", editNGOProfile);

export default router;
