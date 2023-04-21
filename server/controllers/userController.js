const User = require('../models/userModel');
// const Donation = require('../models/donationsModel');
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
    const { firstname, lastname } = req.body
    console.log(firstname, lastname)
    const user = await User.findById({ _id: req.params.id });
    user.firstname = firstname;
    user.lastname = lastname;
    await user.save();
    return res.status(200).send({ message: "Profile updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// 4. And an event to user
const addEvent = async (req, res) => {
  try{
    const newEvent = req.body.event
    console.log('trying to add this: ', newEvent)
    const user = await User.findOne({ _id: req.params.id });
    user.attending.push(newEvent)
    await user.save();
    console.log('Event added: ', user.attending)
    return res.status(200).send({ results: user, message: user.attending });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// 5. Add a donation to user
const addDonation = async (req, res) => {
  try{
    const newDonation = req.body.donation;
    const newNgo = req.body.ngo;
    const user = await User.findOne({ _id: req.params.id });
    user.donations.push(newDonation)
    user.ngos.push(newNgo)
    await user.save();
    console.log('Donation added: ', user.donations, user.ngos)
    return res.status(200).send({ results: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};



// 6. Add an organization to user
const follow = async (req, res) => {
  try{
    const newFollow = req.body.follow;
    const user = await User.findOne({ _id: req.params.id });
    const ngoExists = user.following.find(el => el === newFollow)
    if (ngoExists){
      return res.status(400).send('Already following')
    }
    user.following.push(newFollow)
    await user.save();
    console.log('Followed Orgs: ', user.following)
    return res.status(200).send({ results: user, message: user.following });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Already following' });
  }
};

// 7. Unfollow/Delete an organization 
const unfollow = async (req, res) => {
  try{
    const remove = req.body.remove;
    const user = await User.findOne({ _id: req.params.id })
    let following = [...user.following];
    console.log(following, user)
    let updatedFollowing = following.filter(el => el !== remove);
    console.log(updatedFollowing, remove)
    user.following = updatedFollowing;
    await user.save();
    return res.status(200).send({ message: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// 8. Set goal amount
const editGoal = async (req, res) => {
  try {
    const goalAmount = req.body.goalAmount
    const user = await User.findById({ _id: req.params.id });
    user.goalAmount = goalAmount;
    await user.save();
    return res.status(200).send({ message: "Goal amount updated", goalAmount });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};



module.exports = { getUser, getUsers, addEvent, follow, unfollow, deleteProfile, editProfile, editGoal, addDonation }