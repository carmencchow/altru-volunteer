import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { api } from "../utils/api";

const stripeBtn = () => {
  const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

  const onToken = async (token) => {
    const body = {
      amount: 999,
      token: token,
    };

    await api
      .post("/payment", body)
      .then((response) => {
        console.log(response);
        alert("Payment Success");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return <StripeCheckout token={onToken} stripeKey={publishableKey} />;
};
export default stripeBtn;
