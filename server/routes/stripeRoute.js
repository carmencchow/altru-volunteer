const express = require('express')
const { getPayment } = require('../controllers/stripeController')

const router = express.Router();

router.post('/payment', getPayment) 


module.exports = router
