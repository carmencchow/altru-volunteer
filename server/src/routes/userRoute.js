import express from "express";
import {
  getUser,
  addEvent,
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
router.post("/:id/add-event", addEvent);
router.post("/:id/event", createNGOEvent);
router.put("/:id/event", editNGOEvent);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);
router.post("/:id/addNgo", addNGOProfile);
router.put("/:id/editNgo", editNGOProfile);

export default router;
