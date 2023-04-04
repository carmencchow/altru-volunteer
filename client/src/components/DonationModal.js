import React, { useState } from 'react'
import { GrFormClose } from "react-icons/gr";
import StripeCheckout from 'react-stripe-checkout'
import './DonationModal.css'

const DonationModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState('');
  const [dollarAmount, setDollarAmount] = useState('');
  const [message, setMessage] = useState('');
  if (!open) return null;

  const handleAmountChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
    console.log('Amount is', e.target.value);
  }

  const handleAmountSelected = (e) => {
    
    setAmount(e.target.value);
    console.log('Amount selected is', dollarAmount);
    setMessage('You selected ...')
  }

  const makePayment = token => {
    const body = {
      token, 
      amount
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch('http://localhost:5000/api/payment', {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response)
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div onClick={onClose} className="overlay">
          <div onClick={(e) => { e.stopPropagation()}}>

            <GrFormClose className="close-btn" onClick={onClose} />
            <h1>Donation Card</h1>
           
            <div className="amount">
              <button className="donation-amounts" onClick={handleAmountSelected}>$15</button>              
              <button className="donation-amounts" onClick={handleAmountSelected} value={dollarAmount}>$25</button>
              <button className="donation-amounts">$50</button>
              <button className="donation-amounts">$75</button>
            </div>

            <input 
              type="text" 
              className="input"
              value={amount}
              onChange={handleAmountChange}
            />
            <div>Amount donating {setMessage}</div>


            <div className="frequency">
              <p>One-time donation</p>
              <p>Monthly donation</p>
            </div>
    
            <StripeCheckout 
              // TEST CC: 4242 4242 4242 4242; 12/34; 123
              stripeKey="pk_test_51L1kSgAoNhpouPlcfYHS4qZk7puLHRnuQFurkS8DelIS2DvAgtPR5nM4DWIdI3rjZCUyhkg9USb34AEQBf2Zz32r00TiqYY6E9"
              // Token fires a method
              token={makePayment}
              name="Your donation"
              amount={amount * 100}
      
            />
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default DonationModal