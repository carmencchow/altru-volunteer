const express = require('express')
const { getUser, getUsers, deleteProfile, editProfile, addDonation } = require('../controllers/userController')
const auth = require ('../middleware/auth')

const router = express.Router();

//localhost:5000/api/user/642ee67ed27372c4851ae022
router.get('/', getUsers)
router.get('/:id',  getUser)
router.delete('/:id', deleteProfile)
router.put('/:id', editProfile)
router.post('/:id/donation', addDonation)

module.exports = router

