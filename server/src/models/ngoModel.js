import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
  },
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  url: {
    type: String,
  },
  telephone: {
    type: Number,
  },
  category: {
    type: String,
  },
  commitment: {
    type: String,
  },
  frequency: {
    type: String,
  },
  num_volunteers: {
    type: Number,
  },
  goalAmount: {
    type: Number,
  },
  help: {
    type: String,
  },
  event: {
    type: Boolean,
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
  donors: [
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
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
