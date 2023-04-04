import React, { useState } from 'react'
import { GrFormClose } from "react-icons/gr";
import axios from 'axios';
import './VolunteerModal.css'

const VolunteerModal = ({ onClose, open, id }) => {
  const [openModal, setOpenModal] = useState(true);
  const [ngo, setNgo] = useState(null);

  const getNgo = async (id) => {
    const res = await axios.get(`http://localhost:5000/api/ngo/${id}`);
    setNgo(res.data);
  };

  if (!open) return null;

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
        <button>Confirm</button>
      </div>
    </div>
  )
}

export default VolunteerModal