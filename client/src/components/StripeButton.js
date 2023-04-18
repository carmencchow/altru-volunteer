import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = () => {
  const publishableKey = 
  // process.env.REACT_APP_STRIPE_KEY
"pk_test_51L1kSgAoNhpouPlcggVUZyCuhwjZKomWM4sK8IrNj9OI3OumyeYeNkOrSPTrshrj8vbjJdA82r7FBgKueeUOzNbk00vJ7IMMjT"

// REACT_APP_STRIPE_KEY = 

  // Send card info to Stripe and returns a token object
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
  };
  axios
      // Send token and amount to the backend in the body with axios request
      .post("http://localhost:8000/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    // TEST CC: 4242 4242 4242 4242; 
    // 12/23 (any future date)
    // 567 (any 3 digits)
    <StripeCheckout/>
  );
};
export default stripeBtn;