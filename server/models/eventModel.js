const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    ngo: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ngo',
    },
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
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
    // event_info: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     date: {
    //       type: String,
    //     },
    //     time: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },  
    //   }
    // ] 
  });

module.exports = mongoose.model('Event', eventSchema);
