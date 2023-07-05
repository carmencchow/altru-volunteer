import express from "express";
import {
  getNgos,
  getNgo,
  getFiltered,
  updateVolunteerCount,
} from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.put("/:id/decrement", updateVolunteerCount);
router.get("/:frequency/:category", getFiltered);

export default router;
