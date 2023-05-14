const express = require("express");
const {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
} = require("../controllers/ngoController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", getNgos);
router.get("/:id", getNgo);
router.get("/:frequency/:category", getFiltered);
router.post("/", createNgo);

module.exports = router;
