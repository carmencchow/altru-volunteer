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
    type: String,
  },
  category: {
    type: Array,
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
  oneDayEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "et",
    },
  ],
  volunteers: [
    {
      type: String,
      ref: "User",
    },
  ],
  donors: [
    {
      type: String,
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
