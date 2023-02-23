const express = require('express')
const { createNgo, getNgos, getNgo, deleteNgo, updateNgo } = require('../controllers/ngoController')

const router = express.Router();

router.get('/', getNgos) // localhost:5000/api/ngo
router.get('/:id', getNgo) // localhost:5000/api/ngo/:id
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.patch('/:id', updateNgo)

module.exports = router

