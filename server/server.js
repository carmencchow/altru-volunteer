require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const ngoRoutes = require('./routes/ngo'); 
const PORT = process.env.PORT || 5001;
 
// Express app
const app = express();

// Middleware
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body.
app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// Routes
app.use('/api/ngo', ngoRoutes);

// Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
  // Listen for requests
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port', ${PORT}`);
    })
  })
  // In case the wrong password or URI is entered:
  .catch((err) => {
    console.log(err)
  })



