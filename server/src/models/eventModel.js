import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
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
  help: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
