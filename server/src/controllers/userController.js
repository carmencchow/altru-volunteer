import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";
import Donation from "../models/donationModel.js";

// Helper function to query mongo
const findUser = async (id) => {
  const user = await User.findById(id)
    .populate("ngos")
    .populate([
      {
        path: "events",
        model: "Event",
        populate: {
          path: "ngo",
          model: "Ngo",
        },
      },
    ])
    .populate("organization")
    .populate([
      {
        path: "donations",
        model: "Donation",
        populate: {
          path: "ngo",
          model: "Ngo",
        },
      },
    ]);
  return user;
};

// GET user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (!user) {
      return res.status(400).json({ err: "User doesn't exist" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "Cannot find user" });
  }
};

// EDIT user
const editUser = async (req, res) => {
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

// ADD donation
const addDonation = async (req, res) => {
  try {
    const { amount, ngoId, ngoName } = req.body;
    const user = await User.findById(req.params.id);
    const ngo = await Ngo.findById({ _id: ngoId });
    const donation = await Donation.create({
      ngo: ngoId,
      ngoName,
      donor: user._id,
      amount,
      date: Date.now(),
    });
    console.log("donor", user, ngo);
    user.donations.push(donation._id);
    await Promise.all([
      user.save(),
      Ngo.findOneAndUpdate(
        { _id: ngoId },
        {
          $push: { donations: donation._id },
          $addToSet: { donors: user._id },
        },
        { new: true }
      ),
    ]);
    res.status(200).send({ donation: donation, user: user, ngo: ngo });
  } catch (err) {
    console.log(err);
  }
};

// ADD goal
const addGoal = async (req, res) => {
  try {
    const { goalAmount } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { goalAmount },
      { new: true }
    );
    return res.status(200).send({ message: "Goal amount updated" });
  } catch (error) {
    console.log(err);
    return res.status(500).send({ message: "Couldn't add amount" });
  }
};

// EDIT goal
const editGoal = async (req, res) => {
  try {
    const { goalAmount, uid } = req.body;
    const user = await User.findByIdAndUpdate(
      { _id: uid },
      { goalAmount },
      { new: true }
    );
    return res
      .status(200)
      .send({ message: "Goal amount updated", goalAmount, user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error occurred while updating" });
  }
};

export { getUser, findUser, editUser, addGoal, editGoal, addDonation };
