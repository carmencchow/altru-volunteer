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
          <div onClick={(e) => {
            e.stopPropagation();
          }}
          className="modalContainer">

        <AiFillCloseSquare onClick={onClose}/>
        <h1>Donation Card</h1>
        <p>Lorem ---------------------------------------------------------</p>

      <p>$25</p>
      <p>$50</p>
      <p>$75</p>
      
      <input text='text' placeholder="$ Other amount"></input>

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