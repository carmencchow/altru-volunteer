const express = require('express');
const { signup, login, logout, getMe } = require ('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

//localhost:5000/api/auth
router.post('/signup', signup)
router.post('/login', login) 
router.post('/logout', logout)
router.get('/me', protect, getMe)

module.exports = router;

