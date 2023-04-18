const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid username"] 
  },
  initials: {
    type: String,
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
  image: {
    type: String,
  },
  goal_amount: {
    type: Number,
  },
  following: {
    type: Array,
  },
  donations: {
    type: Array,
  },
  // donations: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "donations",
  //   },
  // ],
  attending: {
    type: Array,
  },
  isAttending: {
    type: Boolean
  }
  // attending: [
  //   { 
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'event',
  //   },
  // ],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
