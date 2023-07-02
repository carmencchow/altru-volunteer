import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";
import mongoose from "mongoose";

// Get all NGOs
const getNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find({}).sort({ name: 1 });
    res.status(200).json(ngos);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

// Get filtered NGOs
const getFiltered = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const frequency = req.params.frequency.toLowerCase();
    console.log(category, frequency);
    if (frequency === "all" && category === "all") {
      let ngos = await Ngo.find({});
      return res.status(200).json(ngos);
    }
    if (frequency === "all") {
      let ngos = await Ngo.find({ category: category });
      return res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ frequency: frequency });
      return res.status(200).json(ngos);
    } else {
      let ngos = await Ngo.find({ category: category, frequency: frequency });
      return res.status(200).json(ngos);
    }
  } catch (err) {
    console.log(err);
  }
};

const getNgo = async (req, res) => {
  const { id } = req.params;
  const ngo = await Ngo.findById(id);
  if (!ngo) {
    console.log("NGO not exist");
    return res.status(404).json({ err: "NGO doesn't exist" });
  }
  return res.status(200).json(ngo);
};

// Create NGO - push [ngo._id to user.ngo] && push [user._id to ngo.owner]
const createNgo = async (req, res) => {
  try {
    const userId = req.body.id;
    const { name, phone, category, commitment, frequency } = req.body;
    console.log(req.body);
    const phoneRegex = /^\d{10}$/;
    if (!name || !phone || !category || !commitment || !frequency) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number format" });
    }
    const existingNgo = await Ngo.findOne({ name });
    if (existingNgo) {
      return res.status(400).json({ error: "NGO already exists" });
    }
    const newNgo = await Ngo.create({
      name,
      phone,
      category,
      commitment,
      frequency,
      volunteers: [],
      amount_raised: [],
      owner: user._id,
    });
    user.ngo = newNgo._id;
    await user.save();
    console.log(user, newNgo);
    return res.status(200).send({ ngo: newNgo, user });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const editNgo = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// Add new Event
const createNGOEvent = async (req, res) => {
  // event details
  try {
    const { name, date, time, description, help } = req.body;
    // find parentNgo
    const event = await Event.create({
      name,
      date,
      time,
      description,
      help,
      event: true,
    });
    await event.save();
    console.log("new Event", event);
    return res.status(200).send({ event });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Edit NGO
const editEvent = async (req, res) => {
  try {
    const { help, eventDate, eventTime, eventDescription } = req.body;
    const event = await Event.find(req.params.id);
    await event.save();
    res.status(200).send({ event: event });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while updating");
  }
};

const updateVolunteerCount = async (req, res) => {
  try {
    const { id } = req.params;
    const ngo = await Ngo.findByIdAndUpdate(
      id,
      { $inc: { num_volunteers: -1 } },
      { new: true }
    );
    console.log(ngo, ngo.num_volunteers);
    return res.status(200).json(ngo);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

export {
  getNgos,
  getNgo,
  createNgo,
  createNGOEvent,
  editEvent,
  editNgo,
  getFiltered,
  updateVolunteerCount,
};
