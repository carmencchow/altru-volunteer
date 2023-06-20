import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  telephone: {
    type: String,
  },
  category: {
    type: Array,
  },
  favorite: {
    type: Boolean,
    default: false,
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
  event_time: {
    type: String,
  },
  event_description: {
    type: String,
  },
  amount: {
    type: String,
  },
  org: {
    type: String,
  },
});

const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;
