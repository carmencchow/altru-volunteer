import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
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
      ref: "User",
    },
  ],
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
