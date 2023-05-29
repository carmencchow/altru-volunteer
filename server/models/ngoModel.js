import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const ngoSchema = new Schema({
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

// export default mongoose.model("Ngo", ngoSchema);
// module.exports = mongoose.model("Ngo", ngoSchema);
// const NgoModel = mongoose.model("Ngo", ngoSchema);
// export default { NgoModel };

const Ngo = mongoose.model("Ngo", ngoSchema);

export default ngoSchema;
