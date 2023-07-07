import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";
import Donation from "../models/donationModel.js";
import Event from "../models/eventModel.js";

// GET MdB USER by ID:
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("ngos")
      .populate("organization")
      .populate("receivingDonations")
      .populate("oneDayEvents")
      .populate("attending");
    // .populate([
    //   {
    //     path: "oneDayEvents",
    //     model: "Event",
    //     populate: {
    //       path: "volunteers",
    //       model: "User",
    //     },
    //   },
    // ])
    // .populate("attending")
    // .populate([
    //   {
    //     path: "donations",
    //     model: "Donation",
    //     populate: {
    //       path: "donor",
    //       model: "User",
    //     },
    //   },
    // ])
    // .populate([
    //   {
    //     path: "receivingDonations",
    //     model: "Donation",
    //     populate: {
    //       path: "donor",
    //       model: "User",
    //     },
    //   },
    // ]);
    console.log("get user data");
    if (!user) {
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "User doesn't exist" });
  }
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

// ADD donation - add USER and Donation amount to NGO
const addDonation = async (req, res) => {
  try {
    const { amount, ngoName, ngoId } = req.body;
    const donorUser = await User.findById(req.params.id);
    console.log("donor", donorUser, donorUser._id);
    const ngo = await Ngo.findById({ _id: ngoId });
    const receivingUser = await User.findOne({ _id: ngo.owner });
    const donation = await Donation.create({
      ngoName,
      donor: donorUser._id,
      amount,
      parentNgo: ngoId,
      date: Date.now(),
      donee: receivingUser._id,
    });
    donorUser.donations.push(donation._id);
    receivingUser.receivingDonations.push(donation._id);

    await Promise.all([
      donorUser.save(),
      receivingUser.save(),
      Ngo.findOneAndUpdate(
        { _id: ngoId },
        {
          $push: { donations: donation._id },
          $addToSet: { donors: donorUser._id },
        },
        { new: true }
      ),
    ]);
    res.status(200).send({ donation, donorUser, receivingUser, ngo });
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

// Add an NGO
const addNGOProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      name,
      category,
      about,
      url,
      telephone,
      commitment,
      frequency,
      help,
    } = req.body;
    console.log("Req Body", req.body);
    const existingNgo = await Ngo.findOne({ name });
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (
      !name ||
      !category ||
      !about ||
      !url ||
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
        about,
        url,
        telephone,
        category,
        commitment,
        frequency,
        help,
        volunteers: [],
        amount_raised: [],
        owner: user._id,
      });
      user.organization = ngo._id;
      await Promise.all([ngo.save(), user.save()]);
      console.log(ngo, user);
      return res.status(200).send({ ngo });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Edit NGO Profile
const editNGOProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const {
      name,
      about,
      url,
      category,
      telephone,
      commitment,
      frequency,
      help,
    } = req.body;
    const ngoId = user.organization;
    const ngo = await Ngo.findOneAndUpdate(
      { _id: ngoId },
      {
        name,
        about,
        url,
        category,
        telephone,
        commitment,
        frequency,
        help,
      },
      { new: true }
    );
    return res.status(200).send({ message: "NGO Profile updated", ngo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

// Create NGO Event
const createNGOEvent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    const ngoId = user.organization;
    const {
      name,
      date,
      startTime,
      location,
      numVolunteers,
      endTime,
      description,
      help,
    } = req.body;
    if (
      !name ||
      !date ||
      !startTime ||
      !endTime ||
      !location ||
      !description ||
      !help ||
      !numVolunteers
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    } else {
      const event = await Event.create({
        name,
        date,
        endTime,
        startTime,
        location,
        description,
        help,
        parentNgo: ngoId,
        organizer: user._id,
        numVolunteers,
      });
      const findUser = await User.findOneAndUpdate(
        { _id: user },
        { $push: { oneDayEvents: event._id } },
        { new: true }
      );
      const ngo = await Ngo.findOneAndUpdate(
        { _id: ngoId },
        { $push: { oneDayEvents: event._id }, event: true },
        { new: true }
      );
      await Promise.all([findUser.save(), ngo.save(), event.save()]);
      console.log(
        "new Event",
        findUser.oneDayEvents,
        ngo.oneDayEvents,
        event.organizer,
        event.parentNgo
      );
      return res.status(200).send({ event });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

// Edit NGO Event
const editNGOEvent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const {
      name,
      date,
      endTime,
      startTime,
      location,
      description,
      help,
      numVolunteers,
    } = req.body;
    const event = await Event.findOneAndUpdate(
      { organizer: user._id },
      {
        name,
        date,
        endTime,
        startTime,
        location,
        description,
        help,
        numVolunteers,
      },
      { new: true }
    );
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.status(200).send({ event });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error while updating");
  }
};

// DELETE NGO event
const deleteNGOEvent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const event = await Event.findOneAndDelete({ organizer: user._id });
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.status(400).send("Event not found");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error while deleting event");
  }
};

// ADD EVENT to volunteer and organizer USERS
const attendEvent = async (req, res) => {
  try {
    const ngoId = req.body.id;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { attending: ngoId } },
      { new: true }
    );
    const ngo = await Ngo.findByIdAndUpdate(
      ngoId,
      { $addToSet: { volunteers: user._id } },
      { new: true }
    );
    await Promise.all([ngo.save(), user.save()]);
    res.status(200).send({ "Events:": user.attending });
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
  attendEvent,
  createNGOEvent,
  editNGOEvent,
  deleteNGOEvent,
};
