import User from "../models/userModel.js";
import { auth } from "../firebase-config.js";

// CREATE new user - set Firebase UID as MongoDB key
const createUser = async (req, res) => {
  try {
    const { email, uid } = req.body;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const userType = req.body.userType;

    if (userType === "individual") {
      // Create new user doc in MongoDB with firebaseUID
      const newUser = await User.create({
        _id: uid,
        firstname,
        lastname,
        email,
        userType,
        following: [],
        donations: [],
        attending: [],
      });
      await newUser.save();
      console.log("New user", newUser);
      return res.status(200).json({ msg: "User", newUser });
    }
    if (userType === "organization") {
      const newNgo = await Ngo.create({
        _id: uid,
        firstname,
        lastname,
        email,
        userType,
        category: [],
      });
      await nseNgo.save();
      console.log("New ngo", newNgo);
      return res.status(200).json({ msg: "Ngo", newNgo });
    }
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
      .populate("attending")
      .populate("donations");
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export { createUser, verifyUser };
