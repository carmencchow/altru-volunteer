import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiltersContext } from '../context/FiltersContext'
import { AuthContext } from '../context/AuthContext'
import { NgosContext } from '../context/NgosContext'
import { GrFormClose } from 'react-icons/gr'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { getUser} from '../utils/getUser'
import VolunteerBtn from '../components/VolunteerBtn'
import Filters from '../components/Filters'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import image from '../assets/volunteer.jpg'
import './Volunteer.css'

const Volunteer = () => {
  const { user, setUser } = useContext(AuthContext);
  const { filters, setFilters } = useContext(FiltersContext) 
  const { ngos, setNgos } = useContext(NgosContext)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ pageCount, setPageCount ] = useState(1)
  const [ confirm, setConfirm ] = useState('')
  const [ openModal, setOpenModal ] = useState(false)
  const [ ngoModal, setNgoModal ] = useState(null)
  const navigate = useNavigate();

  const handleRegister = async (ngoModal) => {
    setConfirm('Thank you. Please check your email for confirmation')

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${user._id}/add-event`,        
        { 
          event: `${ngoModal.event_description}` 
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const data = res.data;
      console.log(user);
      console.log('New Event added: ', data);
      await getUser(user._id, setUser);
      } catch (e) {
        console.log(e);
      }
    }
  
  const toggleModal = (ngo) => {
    console.log('Card opened:', ngo.name, ngo._id)
    setNgoModal(ngo)
    setOpenModal(!openModal);
  }

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }

  const handleNgoSelected = (id) => {
    console.log(`Going to ${id}`)
    navigate(`/info/${id}`)
  }

  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/4)); 
  }, [ngos.length]) 

  return (
    <div>
      <Navbar/>
        <h2>Start searching for an organization</h2>
        <Filters/>

        {ngos && (        
          <div className="pagination">
            <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}><FcPrevious className="arrow"/>Previous</button>
            <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next<FcNext className="arrow"/></button> 
          </div>
        )}
      
        <div className="display">
          <div className="results-container">
            {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
              return (
                <div className="display-container">
                  <div key={ngo}>
                    <div 
                      className="ngo-name" 
                      onClick={() => handleNgoSelected(ngo._id)}>
                      {ngo.name}
                    </div>
                  <div className="show-details">
                    <div>
                      { ngo.num_volunteer ? <p>Volunteers needed: {ngo.num_volunteers}</p> : null}
                      { ngo.commitment ? <p>Commitment: {ngo.commitment}</p> : null}
                      { ngo.event_date ? <p>Date: {ngo.event_date}</p> : null} 
                      { ngo.event_time ? <p>Time: {ngo.event_time}</p> : null}
                      { ngo.event_description ? <p>Event: {ngo.event_description}</p> : null}
                    </div>             

                    <VolunteerBtn
                      ngoId={ngo._id}
                      disabled={user.attending.find(ngo => ngo===ngo.name)}
                      clickedBtn={user.attending.find(ngo => ngo===ngo.name)}
                      // disabled={user.attending.find(ngo => ngo===ngo.event_description)}
                      // clickedBtn={user.attending.find(ngo => ngo===ngo.event_description)}
                      toggleModal={toggleModal}
                      ngo={ngo}
                    />
                  </div>      
                </div>     
              </div>
              )
            })}
          </div> 
        </div>  

        {openModal && (     
          <Modal
            {...{openModal, setOpenModal, ngoModal, setNgoModal, confirm, setConfirm}}
            />
          )} 
      </div>
    )
  }

export default Volunteer;



