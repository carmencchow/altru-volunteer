import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  ngo: {
    type: String,
  },
  donor: {
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
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
