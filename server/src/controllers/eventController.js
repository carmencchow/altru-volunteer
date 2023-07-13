import Event from "../models/eventModel.js";
import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";

// Get one event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate([
        {
          path: "volunteers",
          model: "User",
        },
      ])
      .populate({
        path: "ngo",
        model: "Ngo",
      });
    res.status(200).send(event);
  } catch (err) {
    console.log(err);
    res.status(404).send("Error fetching event");
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

// Register for event
const registerEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const event = await Event.findById(req.params.id);
    console.log("User and id:", user, event._id);
    if (user.events.includes(event._id)) {
      return res.status(400).send("You are already registered for this event");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { events: event._id } },
      { new: true }
    );
    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      { $addToSet: { volunteers: updatedUser._id } },
      { new: true }
    );
    console.log("Updated event", updatedEvent.volunteers, updatedUser.events);
    res.status(200).send({ event, user });
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't add event");
  }
};

// Remove event
const removeEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const event = await Event.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { events: event._id } },
      { new: true }
    );
    const updatedEvent = await Event.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { volunteers: updatedUser._id } },
      { new: true }
    );
    console.log("Updated event", updatedEvent.volunteers, updatedUser.events);
    res.status(200).send({ event, user });
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't remove event");
  }
};

export {
  getEvents,
  getEvent,
  deleteEvent,
  editEvent,
  registerEvent,
  removeEvent,
};
