const express = require('express');
const { signup, login, logout, getMe } = require ('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/signup', signup)  // localhost:5000/api/auth/signup
router.post('/login', login) // localhost:5000/api/auth/login
router.post('/logout', logout) // localhost:5000/api/auth/logout
router.get('/me', protect, getMe) // localhost:5000/api/auth/me


module.exports = router;

