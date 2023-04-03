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
  tag: {
    type: String,
    required: true,
  }
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