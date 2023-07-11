import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";

// Get all NGO
const getNgo = async (req, res) => {
  const { id } = req.params;
  const ngo = await Ngo.findById(id)
    .populate("owner")
    .populate("events")
    .populate("volunteers")
    .populate("donations");
  if (!ngo) {
    console.log("NGO not exist");
    return res.status(404).json({ err: "NGO doesn't exist" });
  }
  return res.status(200).json(ngo);
};

// Get all NGOs
const getNgos = async (req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const district = req.params.district.toLowerCase();

    console.log(category, district);
    if (district === "all" && category === "all") {
      let ngos = await Ngo.find({}).sort({ createdAt: -1 });
      return res.status(200).json(ngos);
    }
    if (district === "all") {
      let ngos = await Ngo.find({ category: category }).sort({ createdAt: -1 });
      return res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ district: district }).sort({
        createdAt: -1,
      });
      return res.status(200).json(ngos);
    } else {
      let ngos = await Ngo.find({
        category: category,
        district: district,
      });
      return res.status(200).json(ngos);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "" });
  }
};

// Create an Ngo
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

// Edit an Ngo
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
    const existingNgo = user.ngos.find((item) => item.toString() === ngoId);
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

// UNFOLLOW NGO
const unfollowNgo = async (req, res) => {
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

// Create an Event
const createEvent = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    console.log(ngo._id);
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
        volunteer_duties: duties,
        num_volunteers: numVolunteers,
        volunteers: [],
        ngo: ngo._id,
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
const getAllNgoEvents = async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.params.id);
    console.log("all events", ngo.events);
    return ngo.events;
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: "No events found" });
  }
};

// Edit Event
const editEvent = async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id);
  //   if (!user) {
  //     return res.status(404).send("User not found");
  //   }
  //   const {
  //     name,
  //     date,
  //     endTime,
  //     startTime,
  //     location,
  //     description,
  //     help,
  //     numVolunteers,
  //   } = req.body;
  //   const event = await Event.findOneAndUpdate(
  //     { organizer: user._id },
  //     {
  //       name,
  //       date,
  //       endTime,
  //       startTime,
  //       location,
  //       description,
  //       help,
  //       numVolunteers,
  //     },
  //     { new: true }
  //   );
  //   if (!event) {
  //     return res.status(404).send("Event not found");
  //   }
  //   res.status(200).send({ event });
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send("Error while updating");
  // }
};

// DELETE event
const deleteEvent = async (req, res) => {
  // try {
  //   const user = await User.findById(req.params.id);
  //   if (!user) {
  //     return res.status(404).send("User not found");
  //   }
  //   const event = await Event.findOneAndDelete({ organizer: user._id });
  //   if (!event) {
  //     return res.status(404).send("Event not found");
  //   }
  //   res.status(400).send("Event not found");
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).send("Error while deleting event");
  // }
};

// // ADD Donation
// const donateNgo = async (req, res) => {
//   try {
//     const { amount, ngoId } = req.body;
//     const user = await User.findById(req.params.id);
//     console.log("donor", user);
//     const ngo = await Ngo.findById({ _id: ngoId });
//     const donation = await Donation.create({
//       ngo: ngoId,
//       donor: user._id,
//       amount,
//       date: Date.now(),
//     });
//     user.donations.push(donation._id);
//     await Promise.all([
//       user.save(),
//       Ngo.findOneAndUpdate(
//         { _id: ngoId },
//         {
//           $push: { donations: donation._id },
//           $addToSet: { donors: user._id },
//         },
//         { new: true }
//       ),
//     ]);
//     res.status(200).send({ donation, user, ngo });
//   } catch (err) {
//     console.log(err);
//   }
// };

export {
  createNgo,
  editNgo,
  getNgos,
  getNgo,
  followNgo,
  unfollowNgo,
  createEvent,
  getAllNgoEvents,
  editEvent,
  deleteEvent,
};
