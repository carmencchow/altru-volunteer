const express = require('express')
const { createNgo, getNgos, getNgo, getDonationNgos, getVolunteerNgos, deleteNgo, updateNgo } = require('../controllers/ngoController')
const { protect } = require('../middleware/auth')

const router = express.Router();

// localhost:5000/api/ngos
router.get('/', getNgos) 
router.get('/:id', getNgo) 
router.get('/category/:category', getDonationNgos) 
router.get('/:frequency/:category', getVolunteerNgos) 
// router.get('/:region/:category', getFilteredNgos) 
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.put('/:id', updateNgo)

module.exports = router
