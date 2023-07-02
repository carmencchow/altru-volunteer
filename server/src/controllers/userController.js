import mongoose from "mongoose";
import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";

// GET USER by ID:
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("attending")
    .populate("donations")
    .populate("ngo");
  if (!user) {
    return res.status(404).json({ err: "User doesn't exist" });
  }
  res.status(200).json(user);
};

// UPDATE user
const editProfile = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    console.log(firstname, lastname, req.params);
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

// ADD donation
const addDonation = async (req, res) => {
  try {
    const ngo = req.body.name;
    const ngoId = req.body.id;
    const donation = req.body.donation;
    const user = await User.findById(req.params.id);
    user.donations.push(donation);
    user.ngos.push(ngo);
    await user.save();
    res.status(200).send({ results: user.donations });
  } catch (err) {
    console.log(err);
  }
};

// FOLLOW NGO
const follow = async (req, res) => {
  try {
    const newFollow = req.body.follow;
    console.log("New:", newFollow);
    const user = await User.findOne({ _id: req.params.id });
    const ngoExists = user.following.find((ngo) => ngo === newFollow);
    console.log("Exist:", ngoExists);
    if (ngoExists) {
      return res.status(400).send("Already following");
    }
    user.following.push(newFollow);
    await user.save();
    console.log("Followed Orgs: ", user.following);
    return res.status(200).send({ results: user, message: user.following });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Already following" });
  }
};

// UNFOLLOW NGO
const unfollow = async (req, res) => {
  try {
    const remove = req.body.remove;
    const user = await User.findOne({ _id: req.params.id });
    let following = [...user.following];
    console.log(following, user);
    let updatedFollowing = following.filter((ngo) => ngo !== remove);
    console.log(updatedFollowing, remove);
    user.following = updatedFollowing;
    await user.save();
    return res.status(200).send({ message: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
};

// EDIT goal
const editGoal = async (req, res) => {
  try {
    const goalAmount = req.body.goalAmount;
    const user = await User.findById({ _id: req.params.id });
    user.goalAmount = goalAmount;
    await user.save(); // need token
    return res.status(200).send({ message: "Goal amount updated", goalAmount });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// Add NGO
const addNgo = async (req, res) => {
  try {
    const name = req.body.name;
    // const { name, phone, category, commitment, frequency } = req.body;
    // console.log(req.body);
    // const phoneRegex = /^\d{10}$/;
    // if (!name || !phone || !category || !commitment || !frequency) {
    //   return res.status(400).json({ error: "Missing required fields" });
    // }
    const user = await User.findById(req.params.id);
    console.log(user._id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    // if (!phoneRegex.test(phone)) {
    //   return res.status(400).json({ error: "Invalid phone number format" });
    // }
    const existingNgo = await Ngo.findOne({ name });
    if (existingNgo) {
      return res.status(400).json({ error: "NGO already exists" });
    }
    const ngo = await Ngo.create({
      name,
      // phone,
      // category,
      // commitment,
      // frequency,
      volunteers: [],
      amount_raised: [],
      // owner: mongoose.Types.ObjectId(user._id),
    });
    ngo.owner = user._id;
    user.ngo = ngo._id;
    console.log("Ngo's ownerID:", ngo.owner);
    console.log("User'ngoID", user, user.ngo);
    await ngo.save();
    console.log("new ngo", ngo);
    return res.status(200).send({ ngo });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

export {
  getUser,
  follow,
  unfollow,
  editProfile,
  editGoal,
  addDonation,
  addNgo,
};
