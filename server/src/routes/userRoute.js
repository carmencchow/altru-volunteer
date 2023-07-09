import express from "express";
import {
  getUser,
  editUser,
  editGoal,
  addDonation,
} from "../controllers/userController.js";

const router = express.Router();

//userRoute (localhost:5000/api/user)
router.get("/:id", getUser);
router.put("/:id", editUser);
router.put("/:id/amount", editGoal);
router.post("/:id/donation", addDonation);

export default router;
