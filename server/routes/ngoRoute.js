const express = require('express')
const { createNgo, getNgos, getNgo, getDonationNgos, getVolunteerNgos, deleteNgo, updateNgo } = require('../controllers/ngoController')
const auth = require('../middleware/auth')
const router = express.Router();

// localhost:5000/api/ngos
router.get('/', getNgos) 
router.get('/:id', getNgo) 
router.get('/:frequency/:category', getVolunteerNgos) 
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.put('/:id', updateNgo)

// router.get('/', auth, getNgos) 
// router.get('/:id', auth, getNgo) 
// router.get('/:frequency/:category', auth, getVolunteerNgos) 
// router.post('/', auth, createNgo)
// router.delete('/:id', auth, deleteNgo)
// router.put('/:id', auth, updateNgo)

module.exports = router
