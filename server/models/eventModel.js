import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const eventSchema = new Schema({
const eventSchema = new mongoose.Schema({
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default eventSchema;
