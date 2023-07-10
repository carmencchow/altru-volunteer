import express from "express";
import {
  createNgo,
  getNgo,
  getNgos,
  editNgo,
  followNgo,
  unfollowNgo,
} from "../controllers/ngoController.js";

const router = express.Router();

//ngoRoute (localhost:5000/api/ngo)
router.post("/", createNgo);
router.get("/:id", getNgo);
router.put("/:id", editNgo);
router.get("/:district/:category", getNgos);
router.get("/:id", editNgo);
router.post("/follow/:id", followNgo);
router.delete("/unfollow/:id", unfollowNgo);

export default router;
