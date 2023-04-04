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
    required: true,
    default: true,
  }, 
  amount_needed: {
    type: Number,
  },
  volunteers: {
    type: Boolean,
    required: true,
    default: true,
  },
  num_volunteers: {
    type: Number,
    required: true,
  },
  min_hours: {
    type: Number,
  },
  frequency: {
    type: String,
  },
  event: {
    type: Boolean,
    default: false,
  },
  event_date: {
    // type: Date,
    type: String,
  },
  event_time: {
    type: String, 
  },
  event_description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Ngo', ngoSchema);

