const express = require('express');
const { signup, login, logout } = require ('../controllers/authController')

const router = express.Router();

//ROUTES 'localhost:5000/api/auth/
router.post('/signup', signup) 
router.post('/login', login) 
router.post('/logout', logout)

module.exports = router;

