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

// Create new NGO Event
const createNGOEvent = async (req, res) => {
  try {
    const { name, date, time, description, help } = req.body;
    const ngo = await Ngo.findById(req.params.id);
    console.log(ngo);
    const event = await Event.create({
      name,
      date,
      time,
      description,
      help,
      event: true,
      parentNgo: ngo._id,
    });
    await event.save();
    await ngo.save();
    console.log("new Event", event), ngo;
    return res.status(200).send({ event });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Edit NGO Event
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
  createNGOEvent,
  editEvent,
  getFiltered,
  updateVolunteerCount,
};
