const express = require('express')
const { getUser, getUsers, deleteProfile, editProfile } = require('../controllers/userController')
const auth = require ('../middleware/auth')

const router = express.Router();

//localhost:5000/api/user
router.get('/', auth, getUsers)
router.get('/:id', auth, getUser)
router.delete('/:id', auth, deleteProfile)
router.put('/:id', auth, editProfile)

module.exports = router

