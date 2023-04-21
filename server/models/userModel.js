const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true, 
  },
  lastname: {
    type: String,
    required: true,  
  },
  email: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: true, 
  },
  password: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: true, 
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  image: {
    type: String,
  },
  goalAmount: {
    type: Number,
  },
  following: {
    type: [String],
  },
  donations: {
    type: [String],
  },
  ngos: {
    type: [String],
 },
  attending: {
    type: Array,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
