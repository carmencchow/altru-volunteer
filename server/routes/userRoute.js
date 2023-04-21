const express = require('express')
const { getUser, getUsers, deleteProfile, addEvent, follow, unfollow, editProfile, addDonation, editGoal } = require('../controllers/userController')
const auth = require ('../middleware/auth')

const router = express.Router();

//localhost:5000/api/user/642ee67ed27372c4851ae022
router.get('/', getUsers)
router.get('/:id',  getUser)
router.delete('/:id', deleteProfile)
router.put('/:id', editProfile)
router.put('/:id/amount', editGoal)
router.post('/:id/donation', addDonation)
router.post('/:id/add-event', addEvent)
router.post('/:id/follow/ngo', follow)
router.post('/:id/unfollow/ngo', unfollow)

module.exports = router

