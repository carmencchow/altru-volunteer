const express = require('express')
const { getUser, deleteUser, editUser } = require('../controllers/userController')

const router = express.Router();

// GET User
router.get('/user', getUser)

// DELETE User
router.delete('/delete', deleteUser)

// EDIT User
router.post('/edit', editUser)

module.exports = router

