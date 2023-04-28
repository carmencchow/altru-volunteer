require('dotenv').config()
const http = require("http");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const ngoRoutes = require('./routes/ngoRoute'); 
const authRoutes = require('./routes/authRoute'); 
const eventRoutes = require('./routes/eventRoute'); 
const stripeRoutes = require('./routes/stripeRoute'); 
const userRoutes = require('./routes/userRoute'); 
const cors = require('cors');
const PORT = process.env.PORT || 5001;
const Ngo = require('./models/ngoModel');
const Event = require('./models/eventModel');
const User = require('./models/userModel');

// Add Stripe key
const stripe = require('stripe')
('sk_test_51L1kSgAoNhpouPlcsLOoeratv5RcCHcEfUfgPew0wwNKZ3R0b1VXLWvvj3AgDxXupbYaDvmQqOdoZPfkVkqWm9yl00loEwN4S4')

// Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use('/api/event', eventRoutes);
app.use('/api/payment', stripeRoutes); 

// Connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`connected to db and listening on port', ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(err)
  })



