import mongoose from "mongoose";
import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";
import Donation from "../models/donationModel.js";

// GET USER by ID:
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("attending")
    .populate("donations")
    .populate("organization")
    .populate("ngos");
  if (!user) {
    return res.status(404).json({ err: "User doesn't exist" });
  }
  res.status(200).json(user);
};

// UPDATE user
const editUserProfile = async (req, res) => {
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
    const { id, amount, ngo } = req.body;
    console.log(req.body);
    const user = await User.findById(req.params.id);
    const donation = await Donation.create({
      amount,
      ngo,
      donor: user._id,
      date: Date.now(),
    });
    await donation.save();

    user.donations.push(donation);
    await user.save();
    console.log(donation, user);
    res.status(200).send({ donation, user });
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
    await user.save();
    return res.status(200).send({ message: "Goal amount updated", goalAmount });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// Add NGO
const addNGOProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { name, category, telephone, commitment, frequency, help } = req.body;
    console.log("Req Body", req.body);
    const existingNgo = await Ngo.findOne({ name });
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (
      !name ||
      !category ||
      !telephone ||
      !commitment ||
      !frequency ||
      !help
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log(user._id);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    if (user.organization) {
      return res
        .status(400)
        .json({ err: "Your account is already linked to an NGO" });
    }
    if (!phoneRegex.test(telephone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }
    if (existingNgo) {
      return res.status(400).json({ error: "NGO already exists" });
    } else {
      const ngo = await Ngo.create({
        name,
        telephone,
        category,
        commitment,
        frequency,
        help,
        volunteers: [],
        amount_raised: [],
        owner: user._id,
      });
      // ngo.owner = user._id;
      user.organization = ngo._id;
      // await ngo.save();
      // await user.save();
      await Promise.all([ngo.save(), user.save()]);
      console.log(ngo, user);
      return res.status(200).send({ ngo });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Edit NGO:
const editNGOProfile = async (req, res) => {
  try {
    const { name, category, telephone, commitment, frequency, help } = req.body;
    const user = await User.findById({ _id: req.params.id });
    user.name = name;
    user.category = category;
    user.telephone = telephone;
    user.commitment = commitment;
    user.frequency = frequency;
    user.help = help;
    await user.save();
    return res.status(200).send({ message: "NGO Profile updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// ADD event
const addEvent = async (req, res) => {
  try {
    const ngoId = req.body.id;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { attending: ngoId } },
      { new: true }
    );
    await user.save();
    res.status(200).send({ results: user, message: user.attending });
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't add event");
  }
};

export {
  getUser,
  follow,
  unfollow,
  editUserProfile,
  editGoal,
  addDonation,
  addNGOProfile,
  editNGOProfile,
  addEvent,
};
