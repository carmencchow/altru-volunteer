const express = require('express')
const { createNgo, getNgos, getNgosByCause, getNgosByRegion, getNgo, deleteNgo, updateNgo } = require('../controllers/ngoController')

const router = express.Router();

router.get('/', getNgos) // localhost:5000/api/ngos
router.get('/:id', getNgo) // localhost:5000/api/ngos/:id
router.get('/region/:region', getNgosByRegion) // localhost:5000/api/ngos/filter/:region
router.get('/cause/:cause', getNgosByCause)
router.post('/', createNgo)
router.delete('/:id', deleteNgo)
router.patch('/:id', updateNgo)

module.exports = router
