const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: {
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

module.exports = mongoose.model("Ngo", ngoSchema);
