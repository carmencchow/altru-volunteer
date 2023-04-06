const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
{
  name: {
    type: String,
  },
  location: { 
    type: String, 
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  num_volunteers: {
    type: Number, 
  },
  parentNgo: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ngo',
    },
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
