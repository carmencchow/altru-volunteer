const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const ngoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  }, 
  website: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
  },
  location: {
    type: Array,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false
  },
  needVolunteers: {
    type: Boolean,
    default: true
  },
  needDonations: {
    type: Boolean,
    default: true
  },
  volunteer: [
    {
      time: {
        type: String,
        required: true
      },
      hours: {
        type: Number,
        required: true
      },
      activity: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      }, 
      category: {
        type: String,
        required: true
      }
    }  
  ]
}, { timestamps: true });


// Make the model based on the above schema
module.exports = mongoose.model('Ngo', ngoSchema);

// {
//   "name": " ",
//   "category": " ",
//   "website": " ",
//   "location": " ",
//   "tag": " "
// }