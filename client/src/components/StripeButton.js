import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const stripeBtn = () => {
  const publishableKey = 
  "pk_test_51L1kSgAoNhpouPlcggVUZyCuhwjZKomWM4sK8IrNj9OI3OumyeYeNkOrSPTrshrj8vbjJdA82r7FBgKueeUOzNbk00vJ7IMMjT";
   

    // Stripe Payment
  // const makePayment = token => {
  //   const body = {
  //     token, 
  //     currentAmount
  //   }
  //   const headers = {
  //     "Content-Type": "application/json"
  //   }
  //   return fetch('http://localhost:5000/api/payment', {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body)
  //   }).then(response => {
  //     console.log(response)
  //   })
  //   .catch(err => console.log(err));
  // }

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
    // TEST CC: 4242 4242 4242 4242; 12/34; 123
        // <div className="stripeContainer">
        //   <p className="stripe-text">
        //     Would you like to donate this amount?
        //   </p>
        //   <StripeCheckout stripeKey= "pk_test_51L1kSgAoNhpouPlcfYHS4qZk7puLHRnuQFurkS8DelIS2DvAgtPR5nM4DWIdI3rjZCUyhkg9USb34AEQBf2Zz32r00TiqYY6E9"
        //     token={makePayment}
        //     name="Your donation"
        //     amount={currentAmount * 100}/>
        // </div> 

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