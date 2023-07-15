import Ngo from "../models/ngoModel.js";
import User from "../models/userModel.js";

// Do I need to create a separate Image collection if this doesn't work???
const uploadImage = async (req, res) => {
  try {
    const { base64 } = req.body;
    console.log("encodedImage", base64);
    const user = await User.findById(req.params.id);
    const ngo = await Ngo.findByOneAndUpdate(
      { _id: user.organization },
      {
        file_name: base64,
      },
      { new: true }
    );
    return res.status(200).send(ngo);
  } catch (err) {
    console.log(err);
    return res.status(400).send(console.error);
  }
};

export { uploadImage };
