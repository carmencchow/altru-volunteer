import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
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
  ngos: {
    type: [String],
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
  goalAmount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
