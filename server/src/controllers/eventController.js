// import Event from "../models/eventModel.js";

// // Create NGO Event
// const createEvent = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     console.log(user);
//     const ngoId = user.organization;
//     const {
//       name,
//       date,
//       startTime,
//       location,
//       numVolunteers,
//       endTime,
//       description,
//       help,
//     } = req.body;
//     if (
//       !name ||
//       !date ||
//       !startTime ||
//       !endTime ||
//       !location ||
//       !description ||
//       !help ||
//       !numVolunteers
//     ) {
//       return res.status(400).json({ error: "Missing required fields" });
//     } else {
//       const event = await Event.create({
//         name,
//         date,
//         endTime,
//         startTime,
//         location,
//         description,
//         help,
//         parentNgo: ngoId,
//         organizer: user._id,
//         numVolunteers,
//       });
//       const findUser = await User.findOneAndUpdate(
//         { _id: user },
//         { $push: { oneDayEvents: event._id } },
//         { new: true }
//       );
//       const ngo = await Ngo.findOneAndUpdate(
//         { _id: ngoId },
//         { $push: { oneDayEvents: event._id }, event: true },
//         { new: true }
//       );
//       await Promise.all([findUser.save(), ngo.save(), event.save()]);
//       console.log(
//         "new Event",
//         findUser.oneDayEvents,
//         ngo.oneDayEvents,
//         event.organizer,
//         event.parentNgo
//       );
//       return res.status(200).send({ event });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send(err);
//   }
// };

// // Get an event by id
// const getEvent = async (req, res) => {
//   try {
//     const ngo = await Ngo.findById(req.params.id);
//     const event = await Ngo.findByOne({ _id: oneDayEvents });
//     console.log(event);
//     console.log("Ngo is", ngo, ngo.oneDayEvents);
//     res.status(200).json({ events: oneDayEvents });
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ err: err });
//   }
// };

// Get all events
const getEvents = async (req, res) => {
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

// // Edit Event
// const editEvent = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     const {
//       name,
//       date,
//       endTime,
//       startTime,
//       location,
//       description,
//       help,
//       numVolunteers,
//     } = req.body;
//     const event = await Event.findOneAndUpdate(
//       { organizer: user._id },
//       {
//         name,
//         date,
//         endTime,
//         startTime,
//         location,
//         description,
//         help,
//         numVolunteers,
//       },
//       { new: true }
//     );
//     if (!event) {
//       return res.status(404).send("Event not found");
//     }
//     res.status(200).send({ event });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error while updating");
//   }
// };

// // DELETE event
// const deleteEvent = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     const event = await Event.findOneAndDelete({ organizer: user._id });
//     if (!event) {
//       return res.status(404).send("Event not found");
//     }
//     res.status(400).send("Event not found");
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send("Error while deleting event");
//   }
// };

// // Attend event
// const attendEvent = async (req, res) => {
//   try {
//     const ngoId = req.body.id;
//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { $addToSet: { attending: ngoId } },
//       { new: true }
//     );
//     const ngo = await Ngo.findByIdAndUpdate(
//       ngoId,
//       { $addToSet: { volunteers: user._id } },
//       { new: true }
//     );
//     await Promise.all([ngo.save(), user.save()]);
//     res.status(200).send({ results: user, message: user.attending });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Couldn't add event");
//   }
// };

// // Update volunteers needed
// const updateVolunteerCount = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const ngo = await Ngo.findByIdAndUpdate(
//       id,
//       { $inc: { num_volunteers: -1 } },
//       { new: true }
//     );
//     console.log(ngo, ngo.num_volunteers);
//     return res.status(200).json(ngo);
//   } catch (err) {
//     return res.status(400).json({ err: err.message });
//   }
// };

// export {
//   createEvent,
//   editEvent,
//   getEvent,
//   getEvents,
//   deleteEvent,
//   attendEvent,
// };
