const express = require('express')
const { createNgo, getNgos, getNgo, getFilteredNgos, deleteNgo, updateNgo } = require('../controllers/ngoController')

const router = express.Router();

// localhost:5000/api/ngos
router.get('/', getNgos) 
router.get('/:id', getNgo) 
router.get('/:region/:cause', getFilteredNgos) 
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.patch('/:id', updateNgo)

module.exports = router
