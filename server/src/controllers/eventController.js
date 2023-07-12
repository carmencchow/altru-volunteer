import Event from "../models/eventModel.js";
import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";

// Get one event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).send(event);
  } catch (err) {
    console.log(err);
    res.status(404).send({ err: err });
  }
};

// Get Events
const getEvents = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const district = req.params.district.toLowerCase();

    console.log(category, district);
    if (district === "all" && category === "all") {
      let events = await Event.find({}).sort({ createdAt: -1 });
      return res.status(200).json(events);
    }
    if (district === "all") {
      let events = await Event.find({ category: category }).sort({
        createdAt: -1,
      });
      return res.status(200).json(events);
    }
    if (category === "all") {
      let events = await Event.find({ district: district }).sort({
        createdAt: -1,
      });
      return res.status(200).json(events);
    } else {
      let events = await Event.find({
        category: category,
        district: district,
      });
      return res.status(200).json(events);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to return events" });
  }
};

// EDIT event
const editEvent = async (req, res) => {
  try {
    const { name, date, startTime, endTime, description, location, duties } =
      req.body;
    const event = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        date,
        startTime,
        endTime,
        description,
        location,
        duties,
      },
      { new: true }
    );
    console.log("Editing event", event);
    return res.status(200).json({ event });
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot find event");
  }
};

// DELETE event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete({ _id: req.params.id });
    console.log("Deleting event", event._id);
    return res.status(200).json({ event });
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot delete event");
  }
};

// Attend event
const attendEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      { _id: req.body.id },
      { volunteers: user._id },
      { new: true }
    );
    // const user = await User.findByIdAndUpdate(
    //   req.params.id,
    //   { $addToSet: { attending: ngoId } },
    //   { new: true }
    // );
    // const ngo = await Ngo.findByIdAndUpdate(
    //   ngoId,
    //   { $addToSet: { volunteers: user._id } },
    //   { new: true }
    // );
    // await Promise.all([ngo.save(), user.save()]);
    res.status(200).send({ results: user, message: user.attending });
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't add event");
  }
};

export { getEvents, getEvent, deleteEvent, editEvent, attendEvent };
