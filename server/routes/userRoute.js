const express = require('express')
const { getUser, getUsers, deleteUser, editUser } = require('../controllers/userController')

const router = express.Router();

// localhost:5000/api/user
router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser)
router.put('/:id', editUser)

module.exports = router

