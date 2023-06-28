import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
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
  event: {
    type: Boolean,
  },
  event_date: {
    type: String,
  },
  num_volunteers: {
    type: Number,
  },
  help: {
    type: String,
  },
  event_time: {
    type: String,
  },
  event_description: {
    type: String,
  },
  userType: {
    type: String,
  },
  amount_raised: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
