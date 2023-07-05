import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  ngoName: {
    type: String,
  },
  donor: {
    type: String,
    ref: "User",
  },
  donee: {
    type: String,
    ref: "User",
  },
  amount: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parentNgo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ngo",
  },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
