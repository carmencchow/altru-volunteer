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
  receivingDonations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
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
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  oneDayEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
