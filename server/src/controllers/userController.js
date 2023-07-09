import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";
import Donation from "../models/donationModel.js";

const findUser = async (id) => {
  const user = await User.findById(id)
    .populate("ngos")
    .populate("events")
    .populate("organization")
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
  // .populate([
  //   {
  //     path: "attending",
  //     model: "Ngo",
  //     populate: [b
  //       {
  //         path: "oneDayEvents",
  //         model: "Event",
  //       },
  //     ],
  //   },
  // ])
  return user;
};

// GET user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUser(id);
    if (!user) {
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "User doesn't exist" });
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

export { getUser, findUser, editUser, editGoal, addDonation };
