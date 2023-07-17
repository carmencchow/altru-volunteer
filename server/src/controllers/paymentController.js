import stripe from "stripe";

const getPayment = (req, res) => {
  const donation = req.body.donation;
  const token = req.body.token;
  console.log(`Donation amount: ${donation}`);

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        customer: customer.id,
        amount: donation * 100,
        currency: "cad",
        description: `${amount} donation`,
      });
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

export default getPayment;
