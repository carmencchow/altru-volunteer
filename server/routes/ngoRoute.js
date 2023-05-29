import express from "express";
import {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
} from "../controllers/ngoController.js";
// import auth from "../middleware/auth";
const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.get("/:frequency/:category", getFiltered);
router.post("/", createNgo);

export default router;
