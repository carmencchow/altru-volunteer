const Ngo = require('../models/ngoModel');
const mongoose = require('mongoose');

const getPayment = async (req, res) => {

  const donation = req.body.donation 
  const token = req.body.token 
  console.log(`Donation amount: ${donation}`)
  const idempotencyKey = uuid() // To prevent user from being charged twice

  return stripe.customers.create({
    email: token.email,
    source: token.id
  })
  .then(customer => {
    // have access to the customer object
    stripe.charges.create({
      customer: customer.id,
      amount: donation * 100,
      currency: 'usd',
      description: 'donation',
      shipping: {
        name: token.card.name,
        address: {
          city: token.card.address_city
        }
      }
    }, {idempotencyKey})
  })
  .then(res => res.status(200).json(result))
  .catch(err => console.log(err))

}



module.exports = getPayment 