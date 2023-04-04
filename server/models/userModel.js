const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid username"] 
  },
  email: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: [true, "Please enter a valid email address"] 
  },
  password: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: [true, "Please provide a password"]  
  },
  phone: {
    unique: true,
    type: Number,
  },
  image: {
    type: String,
    required: false,
  },
  goal_amount: {
    type: Number,
  },
  donations: {
    type: Number,
  },
  hours_volunteered: {
    type: Number,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
