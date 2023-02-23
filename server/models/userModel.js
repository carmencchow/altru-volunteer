const mongoose = require('mongoose');
// const { Schema } = mongoose;
const Schema = mongoose.Schema;

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
}, { timestamps: true });

// export default mongoose.model('User', userSchema);
module.exports = mongoose.model('User', userSchema);
