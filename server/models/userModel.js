const mongoose = require('mongoose');
const { Schema } = mongoose;
// var crypto = require('crypto');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },
  image: {
    type: String,
    required: false,
  },
}, {timestamps: true});

export default mongoose.model('User', userSchema);