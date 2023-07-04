import express from "express";
import {
  getNgos,
  getNgo,
  getFiltered,
  updateVolunteerCount,
  createNGOEvent,
  editEvent,
} from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.post("/:id/event", createNGOEvent);
router.put("/:id/event", editEvent);
router.put("/:id/decrement", updateVolunteerCount);
router.get("/:frequency/:category", getFiltered);

export default router;
