import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = () => {
  const publishableKey = 
  "pk_test_51L1kSgAoNhpouPlcggVUZyCuhwjZKomWM4sK8IrNj9OI3OumyeYeNkOrSPTrshrj8vbjJdA82r7FBgKueeUOzNbk00vJ7IMMjT";
   

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
    <StripeCheckout
      label="Go Premium" //Component button text
      name="Business LLC" //Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" //Submit button in modal
      amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://www.vidhub.co" //Pop-in header image
      billingAddress={false}
    />
  );
};
export default stripeBtn;