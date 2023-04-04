import React, { useState } from 'react'
import { GrFormClose } from "react-icons/gr";
import './Attend.css'

const Attend = ({ onClose }) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <div className="modal-background">
      <div className="modal-popup">
        <div className="modal-popup-heading">
           <div className="right-side">
            <GrFormClose className="close-btn" onClick={onClose} />
          </div>
 
          <h1>You are registering for this event: </h1>
        </div> 
        <div>
          <p>Date</p>
          <p>Time</p>
          <p>Description</p>
          <p>Organization</p>
        </div>
        <button>Save</button>
      </div>
    </div>
  )
}

export default Attend