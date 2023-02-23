const express = require('express')
const { getUser, deleteUser } = require('../controllers/userController')

const router = express.Router();

// GET User
router.get('/user', getUser)

// DELETE User
router.delete('/', deleteUser)


module.exports = router

