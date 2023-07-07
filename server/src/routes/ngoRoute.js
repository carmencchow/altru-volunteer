import express from "express";
import {
  getNgos,
  getNgo,
  getFiltered,
  getEvent,
  updateVolunteerCount,
} from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.get("/:id/event/", getEvent);
router.put("/:id/decrement", updateVolunteerCount);
router.get("/:frequency/:category", getFiltered);

export default router;
