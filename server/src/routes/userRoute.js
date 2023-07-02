import express from "express";
import {
  getUser,
  follow,
  unfollow,
  addNgo,
  editProfile,
  addDonation,
  editGoal,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", editProfile);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);
router.post("/:id/follow/ngo", follow);
router.post("/:id/unfollow/ngo", unfollow);
router.post("/:id/addNgo", addNgo);

export default router;
