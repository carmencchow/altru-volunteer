import User from "../models/userModel.js";

// CREATE new user
const createUser = async (req, res) => {
  // If user is organization create NGO profile
  try {
    const { email, uid, firstname, lastname, userType } = req.body;
    console.log(email, uid, firstname, lastname, userType);
    const newUser = await User.create({
      _id: uid,
      userType,
      firstname,
      lastname,
      email,
    });
    await newUser.save();
    console.log("New user", newUser);
    return res.status(200).send({ user: newUser });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// VERIFY existing FB user
const verifyUser = async (req, res) => {
  try {
    const uid = req.body.uid;
    const user = await User.findById(uid)
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
    console.log("verifyUser:", user._id);
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export { createUser, verifyUser };
