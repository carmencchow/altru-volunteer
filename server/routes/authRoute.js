const express = require('express');
const { register, login, logout } = require ('../controllers/authController')

const router = express.Router();

// Register, login, and logout routes

router.post('/register', register)  // localhost:5000/api/auth/register
router.post('/login', login) // localhost:5000/api/auth/login
router.post('/logout', logout) // localhost:5000/api/auth/logout


module.exports = router;

