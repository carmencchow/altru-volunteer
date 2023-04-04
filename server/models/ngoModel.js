const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: Array,
  }, 
  website: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false
  },  
  amount_needed: {
    type: Number,
  },
  frequency: {
    type: String,
  },
  upcoming_event: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Ngo', ngoSchema);

