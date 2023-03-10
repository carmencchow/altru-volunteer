const express = require('express')
const getPayment  = require('../controllers/stripeController')

const router = express.Router();

// POST payment
router.post('/payment', getPayment) 


module.exports = router;
