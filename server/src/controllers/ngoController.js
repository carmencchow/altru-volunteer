import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";

// GET all NGO
const getNgo = async (req, res) => {
  const { id } = req.params;
  const ngo = await Ngo.findById(id)
    .populate({
      path: "owner",
      model: "User",
    })
    .populate([
      {
        path: "volunteers",
        model: "User",
      },
    ])
    .populate([
      {
        path: "events",
        model: "Event",
        populate: {
          path: "volunteers",
          model: "User",
        },
      },
    ])
    .populate([
      {
        path: "donations",
        model: "Donation",
        populate: {
          path: "donor",
          model: "User",
        },
      },
    ]);
  if (!ngo) {
    console.log("NGO not exist");
    return res.status(404).json({ err: "NGO doesn't exist" });
  }
  return res.status(200).json(ngo);
};

// GET all NGOs
const getNgos = async (req, res) => {
  try {
    const category = req.params.category;
    const district = req.params.district;
    console.log(category, district);
    if (district === "all" && category === "all") {
      let ngos = await Ngo.find({})
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "events",
            model: "Event",
            populate: {
              path: "volunteers",
              model: "User",
            },
          },
        ]);
      return res.status(200).json(ngos);
    }
    if (district === "all") {
      let ngos = await Ngo.find({ category })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "events",
            model: "Event",
            populate: {
              path: "volunteers",
              model: "User",
            },
          },
        ]);
      return res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ district })
        .sort({
          createdAt: -1,
        })
        .populate([
          {
            path: "events",
            model: "Event",
            populate: {
              path: "volunteers",
              model: "User",
            },
          },
        ]);
      return res.status(200).json(ngos);
    } else {
      let ngos = await Ngo.find({
        category,
        district,
      }).populate([
        {
          path: "events",
          model: "Event",
          populate: {
            path: "volunteers",
            model: "User",
          },
        },
      ]);
      return res.status(200).json(ngos);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Unable to return results" });
  }
};

// CREATE an Ngo
const createNgo = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      address,
      district,
      telephone,
      url,
      uid,
      file_name,
    } = req.body;
    const ownerExists = await Ngo.findOne({ owner: uid });
    const nameExists = await Ngo.findOne({ name });
    const user = await User.findById(uid);
    if (
      !name ||
      !description ||
      !category ||
      !address ||
      !district ||
      !url ||
      !telephone
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (ownerExists) {
      return res
        .status(400)
        .json({ error: "You have already created an organization account" });
    }
    if (nameExists) {
      return res.status(400).json({ error: "NGO already exists" });
    } else {
      console.log(district, category);
      const ngo = await Ngo.create({
        name,
        description,
        category,
        address,
        district,
        url,
        telephone,
        volunteers: [],
        donations: [],
        events: [],
        owner: uid,
        file_name: "",
      });
      user.organization = ngo._id;
      user.save();
      return res.status(200).send({ ngo, user });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// EDIT an Ngo
const editNgo = async (req, res) => {
  try {
    const { name, description, category, address, district, url, telephone } =
      req.body;
    const ngo = await Ngo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name,
        description,
        category,
        address,
        district,
        url,
        telephone,
      },
      { new: true }
    );
    return res.status(200).send({ message: "NGO Profile updated", ngo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// FOLLOW NGO
const followNgo = async (req, res) => {
  try {
    const { ngoId, uid } = req.body;
    const user = await User.findOne({ _id: uid });
    console.log(ngoId, user._id);
    const existingNgo = user.ngos.find((item) => item === ngoId);
    if (existingNgo) {
      return res.status(400).send("Already following");
    }
    user.ngos.push(ngoId);
    await user.save();
    console.log("Following:", user.ngos);
    return res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Already following" });
  }
};

// UNFOLLOW Ngo
const unfollowNgo = async (req, res) => {
  try {
    const { userId } = req.body;
    const ngo = await Ngo.findById(req.params.id);
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { ngos: ngo._id } },
      { new: true }
    );
    await user.save();
    return res.status(200).send({ message: user });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error removing ngo");
  }
};

// Create an Event
const createEvent = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    const category = ngo.category;
    const {
      name,
      date,
      startTime,
      location,
      numVolunteers,
      endTime,
      description,
      duties,
    } = req.body;
    console.log(req.body);
    if (
      !name ||
      !date ||
      !startTime ||
      !endTime ||
      !location ||
      !description ||
      !duties ||
      !numVolunteers
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingEvent = ngo.events.find((event) => event.name === name);
    if (existingEvent) {
      return res.status(400).json({ error: "Event already exists " });
    } else {
      const event = await Event.create({
        name,
        date,
        endTime,
        startTime,
        location,
        description,
        duties,
        num_volunteers: numVolunteers,
        volunteers: [],
        ngo: ngo._id,
        category,
        dateAdded: Date.now(),
      });
      const updatedNgo = await Ngo.findOneAndUpdate(
        { _id: ngo._id },
        { $push: { events: event._id } },
        { new: true }
      );
      await Promise.all([updatedNgo.save(), event.save()]);
      console.log(event);
      return res.status(200).send({ event });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Get an ngo's list of events
const getNgoEvents = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id).populate([
      {
        path: "events",
        model: "Event",
        populate: {
          path: "volunteers",
          model: "User",
        },
      },
    ]);
    const events = ngo.events;
    console.log("Ngo events", events);
    return res.status(200).send(events);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: "No events found" });
  }
};

// GET one event
const getNgoEvent = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    return res.status(200).json(ngo);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Event not found");
  }
};

// GET donations
const getDonations = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id).populate([
      {
        path: "donations",
        model: "Donation",
        populate: {
          path: "donor",
          model: "User",
        },
      },
    ]);
    console.log("Ngo donations", ngo.donations);
    return res.status(200).json(ngo.donations);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while fetching donations");
  }
};

export {
  createNgo,
  editNgo,
  getNgos,
  getNgo,
  followNgo,
  unfollowNgo,
  createEvent,
  getNgoEvent,
  getNgoEvents,
  getDonations,
};
