const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const ngoSchema = new Schema({
  // id: { type: Number, required: true },
  name: {
    type: String,
    required: true
  },
  founded: Number, 
  category: {
    type: Array,
    required: true
  }, 
  website: {
    type: String,
    required: true
  },
  location: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  campaign: {
    type: String,
  }
}, { timestamps: true });


// Make the model based on the above schema
module.exports = mongoose.model('Ngo', ngoSchema);

