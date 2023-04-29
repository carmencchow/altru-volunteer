import React, {useContext, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
// import { NgosContext } from '../context/NgosContext'
import { getUser} from '../utils/getUser'
import { GrFormClose } from 'react-icons/gr'
import './Modal.css'

const Modal = ({ confirm, setConfirm, openModal, setNgoModal, setOpenModal, ngoModal}) => {
  const { user, setUser } = useContext(AuthContext);  
  // const { fetchNgoModal } = useContext(NgosContext);  
  const [ngo, setNgo] = useState('')

  
  const fetchNgo = async () => {  
    try{
      const res = await axios.get(`http://localhost:5000/api/ngos/${ngoModal._id}`)
      setNgo(res.data)
      console.log('Ngo results:', res.data)
    } catch(e){
      console.log(e);
    }
  }
  

  // const toggleModal = (ngo) => {
  //   console.log('Card opened:', ngo.name, ngo._id)
  //   setNgoModal(ngo)
  //   setOpenModal(!openModal);
  // }

  const toggleModal = (ngoModal) => {
    console.log('Card opened:', ngoModal.name, ngoModal._id)
    setNgoModal(ngoModal)
    setOpenModal(!openModal);
  }

  const handleRegister = async () => {
  setConfirm('Thank you. We look forward to meeting you at our event!')
    try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found in localStorage");
    }
    const res = await axios.post(
      `http://localhost:5000/api/user/${user._id}/add-event`,   
      { 
        id: `${ngoModal._id}`,
        title: `${ngoModal.name}` 
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
  console.log('New Event added: ', data.results.attending, ngoModal._id, ngoModal.name);
  await getUser(user._id, setUser);
  await fetchNgo(ngoModal._id)
  setOpenModal(false);
  } catch (e) {
  console.log(e);
  }
}

  return (
    <div className="modal-background">
      <div className="modal-popup">
      <div className="modal-content"> 
          <div className="modal-innercontent">
        <div className="close-btn-row"><GrFormClose className="close-btn" onClick={toggleModal}/>
        </div>
          <p className="event-name">{ngoModal.event_description}</p>
          <p className="event-org">{ngoModal.name}</p>
          <p className="text">Date: <span>{ngoModal.event_date}</span></p>
          <p className="text">Time: <span>{ngoModal.event_time}</span></p>  
          <p className="contact">Please enter your contact info below</p>
      
        <div className="contact-info">
          <div className="modal-inputs">
          <input className="modal-input" type="text" name="name" placeholder="  Name"/>
          <input className="modal-input" type="text" name="email" placeholder="  Email"/>
        </div></div>

        <div className="button-container">
          <div className="confirm-btn" onClick={() => handleRegister(ngoModal)}><p>Confirm</p></div>
          <p>{confirm}</p>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default Modal