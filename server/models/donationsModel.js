const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donationsSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Donations', eventSchema);
