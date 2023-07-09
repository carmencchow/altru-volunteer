import express from "express";
import {
  createNgo,
  getNgo,
  getNgos,
  editNgo,
  donateNgo,
  followNgo,
  unfollowNgo,
} from "../controllers/ngoController.js";

const router = express.Router();

//ngoRoute (localhost:5000/api/ngo)
router.post("/", createNgo);
router.get("/:id", getNgo);
router.put("/:id", editNgo);
router.post("/donate/:id", donateNgo);
router.get("/:frequency/:category", getNgos);
router.get("/:id", editNgo);
router.post("/follow/:id", followNgo);
router.delete("/unfollow/:id", unfollowNgo);

export default router;
