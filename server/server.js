require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const ngoRoutes = require('./routes/ngoRoute'); 
const authRoutes = require('./routes/authRoute'); 
// const userRoutes = require('./routes/userRoute'); 
const PORT = process.env.PORT || 5001;
const cors = require('cors');

// Add Stripe key
const stripe = require('stripe')('pk_test_51L1kSgAoNhpouPlcfYHS4qZk7puLHRnuQFurkS8DelIS2DvAgtPR5nM4DWIdI3rjZCUyhkg9USb34AEQBf2Zz32r00TiqYY6E9')
const uuid = require("uuid");

// Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body.
app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// Routes
app.use('/api/ngos', ngoRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

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



