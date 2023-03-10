require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const ngoRoutes = require('./routes/ngoRoute'); 
const authRoutes = require('./routes/authRoute'); 
const stripeRoutes = require('./routes/stripeRoute'); 
const userRoutes = require('./routes/userRoute'); 
const PORT = process.env.PORT || 5001;
const cors = require('cors');

// Add Stripe key
const stripe = require('stripe')
('sk_test_51L1kSgAoNhpouPlcsLOoeratv5RcCHcEfUfgPew0wwNKZ3R0b1VXLWvvj3AgDxXupbYaDvmQqOdoZPfkVkqWm9yl00loEwN4S4')

const uuid = require("uuid");

// Express app
const app = express();

// Middleware
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body.
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// Routes
app.use('/api/ngos', ngoRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', stripeRoutes); 

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



