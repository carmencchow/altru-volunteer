import User from "../models/userModel.js";
import Ngo from "../models/ngoModel.js";
import { auth } from "../firebase-config.js";

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
      // goalAmount
    });
    await newUser.save();
    console.log("New user", newUser);
    return res.status(200).send({ user: newUser });
  } catch (error) {
    console.log("Error is", error);
    return res.status(400).send(error);
  }
};

// VERIFY existing user
const verifyUser = async (req, res) => {
  try {
    const uid = req.body.uid;
    const user = await User.findById(uid)
      .populate("ngos")
      .populate("attending")
      .populate("donations");
    console.log("MongoDB User verified", user);
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export { createUser, verifyUser };
