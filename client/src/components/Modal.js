import React, {useState, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import image from '../assets/volunteer.jpg'
import { getUser} from '../utils/getUser'
import { GrFormClose } from 'react-icons/gr'

const Modal = ({ confirm, setConfirm, openModal, setNgoModal, setOpenModal, ngoModal}) => {
  const { user, setUser } = useContext(AuthContext);  

  const toggleModal = (ngo) => {
    console.log('Card opened:', ngo.name, ngo._id)
    setNgoModal(ngo)
    setOpenModal(!openModal);
  }

  const handleRegister = async () => {
  setConfirm('Thank you. Please check your email for confirmation')
  
  console.log('Event details', ngoModal.name, ngoModal.event_description)

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${user._id}/add-event`,        
        { 
          event: `${ngoModal.event_description}`, 
          name: `${ngoModal.name}`,
          date: `${ngoModal.event_date}`
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
    setConfirm('');
    const data = res.data;
    console.log('New Event added: ', data.results.attending);
    await getUser(user._id, setUser);
    } catch (e) {
    console.log(e);
    }
  }

  return (
    <div>
      <div className="modal">
        <div className="modal-background">
          <div className="modal-popup">
            <div className="modal-content">
              <div className="left-side">
                <img className="modal-image" src={image} alt="volunteers"/> 
              </div>

              <div className="right-side">
                <div className="close-btn-row"><GrFormClose className="close-btn" onClick={toggleModal}/>
                {/* <div className="close-btn-row"><GrFormClose className="close-btn" onClick = {() => setNgoModal(!openModal)}/> */}
                </div>

                <div className="right-side-content">
                  <p className="registering">You are registering for this event: </p>
                  <p className="event-name">{ngoModal.event_description}</p>
                    <p className="event-org"> {ngoModal.name} </p>
                  <p className="text">Date: <span>{ngoModal.event_date}</span></p>
                  <p className="text">Time: <span>{ngoModal.event_time}</span></p>  
                  <p>Please enter your contact info so we can get in touch with you</p>

                  <div className="contact-info">
                    <input className="name" type="text" name="name" placeholder="Full name"/>
                    <input className="email" type="text" name="email" placeholder="Email"/>
                  </div>

                  <div className="confirm" onClick={() => handleRegister(ngoModal)}>Confirm</div>
                  <p>{confirm}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal