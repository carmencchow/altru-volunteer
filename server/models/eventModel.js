const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid username"] 
  },
  location: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: [true, "Please enter a valid email address"] 
  },
  logo: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  }
  
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
