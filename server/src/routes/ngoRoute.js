import express from "express";
import {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
} from "../controllers/ngoController.js";

const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.put("/:id/decrement", updateNgo);
router.get("/:frequency/:category", getFiltered);
router.post("/", createNgo);

export default router;
