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
import Navbar from '../components/Navbar'
import image from '../assets/volunteer.jpg'
import './Volunteer.css'

const Volunteer = () => {
  const { user, userId, setUser, token, setToken } = useContext(AuthContext);
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
    console.log(ngoModal);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${userId}/add-event`,        
        { 
          event: `${ngoModal.name}` 
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
      await getUser(userId, setUser);
      console.log(user)
      } catch (e) {
        console.log(e);
      }
    }
  
  const toggleModal = (ngo) => {
    console.log('toggling modal now')
    setNgoModal(ngo)
    setOpenModal(!openModal);
  }

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  }

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value});
  }

  const handleFrequencyChange = (e) => {
    setFilters({ ...filters, frequency: e.target.value});
  }

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchNgos()
  }

  const handleNgoSelected = (id) => {
    console.log(`Going to ${id}`)
    navigate(`/info/${id}`)
  }
  const fetchNgos = async () => {
    try {
      const frequency = filters.frequency 
      const category = filters.category 
      const res = await axios.get(`http://localhost:5000/api/ngos/${frequency}/${category}`);  
      setNgos(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/4)); 
  }, [ngos.length]) 

  return (
    <div>
      <Navbar/>
        <div className="filters">
          <form className="dropdown">
            <p>Commitment</p>
            <select value={filters.frequency} onChange={handleFrequencyChange}>  
            <option value="all"> Anytime </option>
            <option value="day">One Day Events</option>
            <option value="weekly">Every Week</option>
            <option value="monthly">Once a Month</option> 
            </select>
          </form>

          <form className="dropdown">
            <p>Location</p>
            <select value={filters.virtual} onChange={handleLocationChange}>  
              <option value="all"> Both </option>
              <option value="in-person">In-Person</option>
              <option value="remote">Remote</option>
            </select>
          </form>

          <form className="dropdown">
            <p>Cause</p>
            <select value={filters.category} onChange={handleCategoryChange}>
            <option value="all"> All </option>
            <option value="animals">Animals</option>
            <option value="children & youth">Children & Youth</option>
            <option value="education & literacy">Education & Literacy</option>
            <option value="environment">Environment</option>
            <option value="health & medicine">Health & Medicine</option>
            <option value="sports & recreation">Sports & Recreation</option>
            </select>
          </form>
          
          <button className="searchBtn" onClick={handleSubmit}>
            Search
          </button>
        </div>

          <div className="pagination">
            <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}><FcPrevious className="arrow"/>Previous</button>
            <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next<FcNext className="arrow"/></button> 
          </div>
      
        <div className="display">
          <div className="results-container">
            {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
              return (
                <div className="display-container">
                  <div key={idx}>
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
                      disabled={user.attending.find(event => event===ngo.name)}
                      clickedBtn={user.attending.find(event => event===ngo.name)}
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
                      <p className="registering">You are registering for this event: 
                      <br></br>
                      <br></br>
                      {ngoModal.event_description} 
                      </p>
                       <p className="text">Organization: {ngoModal.name} </p>
                      <p className="text">Date: <span>{ngoModal.event_date}</span></p>
                      <p className="text">Time: <span>{ngoModal.event_time}</span></p>  
                      <p>Please enter your contact info so we can get in touch with you</p>

                      <div className="contact-info">
                        <input className="name" type="text" name="name" placeholder="Full name"/>
                        <input className="email" type="text" name="email" placeholder="Email"/>
                      </div>

                      <div className="confirm" onClick=
                      {() => handleRegister(ngoModal)}>Confirm</div>
                      <p>{confirm}</p>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} 
      </div>
    )
  }

export default Volunteer;




