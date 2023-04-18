const User = require('../models/userModel');
const mongoose = require('mongoose');

// 0. GET user by ID
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

// 1. GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(401).send("Users not found");
    }
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// 2. DELETE user profile
const deleteProfile = async (req, res) => { 
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ err: 'No such user with this id' })
  }
  // Find MongoDB document _id that's equal to the id of the ngo we want to delete
  const user = await User.findOneAndDelete({_id: id}) 
  if (!user){
    return res.status(404).json({ err: "User doesn't exist"})
  }
  res.status(200).json({ message: 'User deleted'})
}

//3. UPDATE user profile
const editProfile = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const user = await User.findById({ _id: req.params.id });
    user.username = username;
    user.email = email;
    await user.save();
    console.log(user._id, user.username, user.email);
    return res.status(200).send({ message: "Profile updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// 4. And an event to user


// 5. Add a donation to user
const addDonation = async (req, res) => {
  try{
    const newDonation = req.body.donation;
    const user = await User.findOne({ _id: req.params.id });
    user.donations.push(newDonation)
    await user.save();
    console.log('Donation added: ', user.donations)
    return res.status(200).send({ results: user, message: user.donations });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// 5. Add an organization to user



module.exports = { getUser, getUsers, deleteProfile, editProfile, addDonation }