import express from "express";
import {
  getUser,
  editUser,
  editGoal,
  addGoal,
  addDonation,
} from "../controllers/userController.js";

const router = express.Router();

//userRoute (localhost:5000/api/user)
router.get("/:id", getUser);
router.put("/:id", editUser);
router.post("/:id/goal", addGoal);
router.put("/:id/goal", editGoal);
router.post("/:id/donation", addDonation);

export default router;
