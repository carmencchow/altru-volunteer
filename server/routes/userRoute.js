const express = require('express')
const { getUser, deleteUser, editUser } = require('../controllers/userController')

const router = express.Router();

router.get('/user', getUser)
router.delete('/delete', deleteUser)
router.post('/edit', editUser)

module.exports = router

