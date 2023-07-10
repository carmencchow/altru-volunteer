import User from "../models/userModel.js";
import { findUser } from "../controllers/userController.js";

// CREATE new user
const createUser = async (req, res) => {
  try {
    const { email, uid, firstname, lastname, isOrganizer } = req.body;
    const user = await User.create({
      _id: uid,
      isOrganizer,
      firstname,
      lastname,
      email,
    });
    await user.save();
    console.log(user);
    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

// VERIFY existing user
const verifyUser = async (req, res) => {
  try {
    const uid = req.body.uid;
    const user = await findUser(uid);
    console.log("verifyUser:", user);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export { createUser, verifyUser };
