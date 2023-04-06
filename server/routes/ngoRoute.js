const express = require('express')
const { createNgo, getNgos, getNgo, getDonationNgos, getVolunteerNgos, deleteNgo, updateNgo } = require('../controllers/ngoController')
const auth = require('../middleware/auth')
const router = express.Router();

// localhost:5000/api/ngos
router.get('/', auth, getNgos) 
router.get('/:id', getNgo) 
router.get('/:frequency/:category', getVolunteerNgos) 
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.put('/:id', updateNgo)

module.exports = router
