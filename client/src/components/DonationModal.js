import React from 'react'
import './DonationModal.css'
import { AiFillCloseSquare } from 'react-icons/ai'
 
const DonationModal = ({ closeModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
      <AiFillCloseSquare onClick={() => closeModal(false)}/>
      <h1>Donation Card</h1>
      <p>Lorem ---------------------------------------------------------</p>

      <p>$25</p>
      <p>$50</p>
      <p>$75</p>
      
      <input text='text' placeholder="$ Other amount">
        </input>

        <button onClick={() => closeModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default DonationModal