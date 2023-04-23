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
  donations: {
    type: Boolean,
    default: true,
  }, 
  amount_needed: {
    type: Number,
  },
  volunteers: {
    type: Boolean,
    default: true,
  },
  num_volunteers: {
    type: Number,
  },
  commitment: {
    type: String,
  },
  frequency: {
    type: String,
  },
  event: {
    type: Boolean,
    default: false,
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
  image:{
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Ngo', ngoSchema);

