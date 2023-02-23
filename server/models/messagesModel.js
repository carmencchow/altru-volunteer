const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const messagesSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  readByUser: {
    type: Boolean,
    required: true
  }, 
  readByOrg: {
    type: Boolean,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export default mongoose.model('Messages', messagesSchema);
