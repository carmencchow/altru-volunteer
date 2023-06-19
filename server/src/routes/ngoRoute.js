import express from "express";
import {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
  updateNgo,
} from "../controllers/ngoController.js";

// const express = require("express");
// const {
//   createNgo,
//   getNgos,
//   getNgo,
//   getFiltered,
//   updateNgo,
// } = require("../controllers/ngoController.js");

const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.put("/:id/decrement", updateNgo);
router.get("/:frequency/:category", getFiltered);
router.post("/", createNgo);

export default router;
// module.exports = router;
