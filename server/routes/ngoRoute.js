const express = require("express");
const {
  createNgo,
  getNgos,
  getNgo,
  getFiltered,
} = require("../controllers/ngoController");
const auth = require("../middleware/auth");
const router = express.Router();

// localhost:5000/api/ngos
router.get("/", getNgos);
router.get("/:id", getNgo);
router.get("/:frequency/:category", getFiltered);
router.post("/", createNgo);

// router.get('/', getNgos)
// router.get('/:id', auth, getNgo)
// router.get('/:frequency/:category', auth, getFiltered)
// router.post('/', auth, createNgo)

module.exports = router;
