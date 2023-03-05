const express = require('express');
const { signup, login, logout } = require ('../controllers/authController')

const router = express.Router();

// signup, login, and logout routes
router.post('/signup', signup)  // localhost:5000/api/auth/signup
router.post('/login', login) // localhost:5000/api/auth/login
router.post('/logout', logout) // localhost:5000/api/auth/logout


module.exports = router;

