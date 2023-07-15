import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  address: {
    type: String,
  },
  district: {
    type: String,
  },
  telephone: {
    type: String,
  },
  url: {
    type: String,
  },
  file_name: {
    type: String,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
