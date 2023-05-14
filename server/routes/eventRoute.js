const express = require("express");
const { getEvent, createEvent } = require("../controllers/eventController");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", getEvent);
router.post("/", createEvent);

module.exports = router;
