const express = require('express');
const { signup, login, logout } = require ('../controllers/authController')

const router = express.Router();

router.post('/signup', signup)  // localhost:5000/api/auth/signup
router.post('/login', login) // localhost:5000/api/auth/login
router.post('/logout', logout) // localhost:5000/api/auth/logout
router.post('/getMe', getMe) // localhost:5000/api/auth/getme


module.exports = router;

