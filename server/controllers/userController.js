const User = require('../models/userModel');
const mongoose = require('mongoose');

// 1. GET a user
const getUser = async (req, res) => { 
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such user with this id' })
  }
  const user = await User.findById(id)
  if (!user){
    return res.status(404).json({ err: "User doesn't exist"})
  }
  res.status(200).json(user)
}

// 2. DELETE a user
const deleteUser = async (req, res) => { 
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such user with this id' })
  }
  // Find MongoDB document _id that's equal to the id of the ngo we want to delete
  const user = await User.findOneAndDelete({_id: id}) 
  if (!user){
    return res.status(404).json({ err: "User doesn't exist"})
  }
  res.status(200).json(user)
}

module.exports = { getUser, deleteUser }