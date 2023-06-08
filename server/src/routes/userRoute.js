import express from "express";
import {
  getUser,
  deleteProfile,
  addEvent,
  follow,
  unfollow,
  editProfile,
  addDonation,
  editGoal,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.delete("/:id", deleteProfile);
router.put("/:id", editProfile);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);
router.post("/:id/add-event", addEvent);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);

export default router;
