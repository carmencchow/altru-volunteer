const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
  name: {
    type: String
  },
  category: {
    type: String,
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
  volunteer_number: {
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
    upcoming: {
      type: Boolean,
    },
    date: {
      type: Date,
    },
    description: {
      type: String,
    },
    time: {
      type: String,
    }
  }
});

module.exports = mongoose.model('Ngo', ngoSchema);

