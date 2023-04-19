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
  username: {
    type: String,
    unique: true,
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
    type: String,
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
