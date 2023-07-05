import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  organizer: {
    type: String,
    ref: "User",
  },
  parentNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  description: {
    type: String,
  },
  numVolunteers: {
    type: Number,
  },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
