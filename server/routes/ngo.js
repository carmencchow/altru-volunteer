const express = require('express')
const { createNgo, getNgos, getNgo, deleteNgo, updateNgo } = require('../controllers/ngoController')

const router = express.Router();

// GET all NGOs
router.get('/', getNgos)

// GET a single NGO
router.get('/:id', getNgo)

// POST a new NGO
router.post('/', createNgo)

// DELETE a new NGO
router.delete('/:id', deleteNgo)

// UPDATE a new NGO
router.patch('/:id', updateNgo)

module.exports = router

