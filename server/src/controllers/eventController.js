import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";

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
      let events = await Event.find({ category }).sort({
        createdAt: -1,
      });
      return res.status(200).json(events);
    }
    if (category === "all") {
      let events = await Event.find({ district }).sort({
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

// GET recent events
const getRecentEvents = async (req, res) => {
  try {
    const events = await Event.find({ dateAdded: { $exists: true } })
      .sort({ dateAdded: -1 })
      .limit(3)
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
    console.log("Events", events);
    return res.status(200).json({ events });
  } catch (err) {
    console.error(err);
    return res.status(400).send(console.error);
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
    const event = await Event.findById(req.params.id);
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { events: event._id } },
      { new: true }
    );
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { volunteers: user._id } },
      { new: true }
    );
    console.log("Updated event", updatedEvent.volunteers, user.events);
    // // Send email to user
    // const transporter = nodemailer.createTransport({
    //   host: process.env.MAIL_HOST,
    //   port: process.env.MAIL_PORT,
    //   secure: false,
    //   service: process.env.MAIL_SERVICE,
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    //   tls: {
    //     ciphers: "SSLv3",
    //   },
    // });

    // // const info = await transporter.sendMail({
    // await transporter.sendMail({
    //   // from: '"Admin" <volunteer.connect@outlook.com>',
    //   from: `Volunteer Connect <${process.env.EMAIL}>`,
    //   to: `${updatedUser.email}`,
    //   subject: `${event} Registration`,
    //   text: `TEST: Hi  Thanks for registering to the ${event.name}. Our volunteer coordinator will be in touch with you soon.`,
    //   html: `<h3>Hi </h3>
    //   <p>TEST: Thanks for registering to the ${event.name}. Our volunteer coordinator will be in touch with you soon.<p>Here are the event details:</p>
    //   <div>
    //     <p>Name: ${event.name}</p>
    //     <p>Organization: ${event.ngo}</p>
    //     <p>Location: ${event.location}</p>
    //     <p>Date: ${event.date}</p>
    //     <p>Time: ${event.startTime}-${event.endTime}</p>
    //   </div>
    //   <h2>We look forward to seeing you there!</h2>
    //   <h2> Volunteer Toronto</h2>`,
    // });
    console.log("Message sent", user.email);
    res.status(200).send({ event: updatedEvent, user });
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
      req.params.id,
      { $pull: { volunteers: updatedUser._id } },
      { new: true }
    );
    console.log("Updated event", updatedEvent.volunteers, updatedUser.events);
    res.status(200).send({ event: updatedEvent, user: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(400).send("Couldn't remove event");
  }
};

export {
  getEvents,
  getEvent,
  getRecentEvents,
  deleteEvent,
  editEvent,
  registerEvent,
  removeEvent,
};
