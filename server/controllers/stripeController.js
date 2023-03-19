const Ngo = require('../models/ngoModel');
const mongoose = require('mongoose');
const stripe = require('stripe')

const getPayment = async (req, res) => {
  const donation = req.body.donation 
  const token = req.body.token 
  console.log(`Donation amount: ${donation}`)
  const idempotencyKey = uuid() // To prevent user from being charged twice

  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      customer: customer.id, // grab from customer object above
      amount: donation * 100, //get dollar amount
      currency: 'usd',
      description: `${amount} donation`,
      shipping: {
        name: token.card.name,
        address: {
          address: token.card.address_line1,
          city: token.card.address_city,
          zip: token.card.address_zip
        }
      }
    }, {idempotencyKey})
  })
  .then(result => res.status(200).json(result))
  .catch(err => console.log(err))

}



module.exports = getPayment