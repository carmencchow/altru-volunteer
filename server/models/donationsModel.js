const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationsSchema = new Schema({
  ngo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ngo",
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date
  },  
}, { timestamps: true });

module.exports = mongoose.model('Donations', eventSchema);
