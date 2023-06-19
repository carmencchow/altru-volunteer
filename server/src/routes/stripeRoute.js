// import express from "express";
// import getPayment from "../controllers/stripeController.js";
const express = require("express");
const getPayment = require("../controllers/stripeController.js");

const router = express.Router();

// POST payment
router.post("/payment", getPayment);

// export default router;
module.exports = router;
