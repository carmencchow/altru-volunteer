const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
{
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  description: {
    type: String,
  },
  parentNgo: 
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ngo',
    },
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
