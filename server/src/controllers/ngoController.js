import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";
import Donation from "../models/donationModel.js";

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
    const frequency = req.params.frequency.toLowerCase();

    console.log(category, frequency);
    if (frequency === "all" && category === "all") {
      let ngos = await Ngo.find({}).sort({ createdAt: -1 });
      return res.status(200).json(ngos);
    }
    if (frequency === "all") {
      let ngos = await Ngo.find({ category: category }).sort({ createdAt: -1 });
      return res.status(200).json(ngos);
    }
    if (category === "all") {
      let ngos = await Ngo.find({ frequency: frequency }).sort({
        createdAt: -1,
      });
      return res.status(200).json(ngos);
    } else {
      let ngos = await Ngo.find({
        category: category,
        frequency: frequency,
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
        .json({ error: "You've already registered an NGO" });
    }
    if (nameExists) {
      return res.status(400).json({ error: "NGO already exists" });
    } else {
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
  // donateNgo,
  followNgo,
  unfollowNgo,
};
