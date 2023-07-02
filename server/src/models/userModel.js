import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  userType: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
  goalAmount: {
    type: Number,
  },
  ngos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ngo",
    },
  ],
  attending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ngo",
    },
  ],
  following: {
    type: [String],
  },
  donations: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
