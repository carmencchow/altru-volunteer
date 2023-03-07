import React from 'react'
import './DonationModal.css'
import { AiFillCloseSquare } from 'react-icons/ai'
import StripeButton from '../components/StripeButton'
 
const DonationModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div onClick={onClose} className="overlay">
          <div onClick={(e) => { e.stopPropagation()}}>

            <AiFillCloseSquare className="close" onClick={onClose}/>
            <h1>Donation Card</h1>
           
            <div className="amount">
              <p>$25</p>
              <p>$50</p>
              <p>$75</p>
            </div>

            <div className="currency">
              <p>$ USD</p>
              <p>$ CAD</p>
              <p>$ EUR</p>
            </div>

            <input text='text' placeholder="$ Other amount"></input>

            <div className="frequency">
              <p>One-time donation</p>
              <p>Monthly donation</p>
            </div>

            <StripeButton/>
              <button>Continue</button>
              <button onClick={onClose}>Cancel</button>
            
            </div>
          </div>
        </div>
    </div>
  )
}

export default DonationModal