const express = require('express');
const { signup, login, logout, getMe } = require ('../controllers/authController')
const auth = require('../middleware/auth')

const router = express.Router();

//ROUTES 'localhost:5000/api/auth/
router.post('/signup', signup) //ROUTES 'localhost:5000/api/auth/signup'
router.post('/login', login) 
router.post('/logout', logout)
router.get('/me', auth, getMe)

module.exports = router;

