const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const ngoSchema = new Schema({
  // id: { type: Number, required: true },
  name: {
    type: String,
    required: true
  },
  founded: Number, 
  category: {
    type: Array,
    required: true
  }, 
  website: {
    type: String,
    required: true
  },
  location: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  campaign: {
    type: String,
  }
}, { timestamps: true });


// Make the model based on the above schema
module.exports = mongoose.model('Ngo', ngoSchema);

/* EXAMPLE NGO & id:

63f51238e6fe9263467a39f2

{
  "name": " ",
  "founded": ,
  "category": [" "],
  "website": "",
  "location": [""],
  "tag": "",
  "campaign": " "
}
*/

/*
{
  "name": "AWARE Trust Zimbabwe",
  "category": ["animal welfare"],
  "website": "http://www.awaretrust.org/",
  "location": ["africa", "zimbabwe"],
  "tag": "AWARE Trust Zimbabwe is the only veterinary conservation NGO in Zimbabwe run by veterinarians.",
  "founded": 2004
}

*/