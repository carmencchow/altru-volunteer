import React, { useState,useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiltersContext } from '../context/FiltersContext'
import { AuthContext } from '../context/AuthContext'
import { NgosContext } from '../context/NgosContext'
import { GrFormClose } from 'react-icons/gr'
import { FcNext, FcPrevious } from 'react-icons/fc'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import image from '../assets/volunteer.jpg'
import './Volunteer.css'

const Volunteer = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { ngos, setNgos } = useContext(NgosContext)
  const { token } = useContext(AuthContext);
  const [ volunteer, setVolunteer ] = useState('Sign up')
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ disabled, setDisabled ] = useState(false)
  const [ pageCount, setPageCount ] = useState(1)
  const [ userInfo, setUserInfo ] = useState('')
  const [ confirm, setConfirm ] = useState('')
  const [ modal, setModal ] = useState(false)
  const navigate = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      setUserInfo(res.data);
      console.log(res.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleRegister = () => {
    setConfirm('Thank you. Please check your email for confirmation')
    setVolunteer('Attending')
    setDisabled(true)
    // Decrement volunteer number by 1
    // Update backend - user's events
    // Update profile
  }

  const handlePrevious = () => {
    console.log('pre page')
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    console.log('next page')
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
    fetchVolunteerNgos()
  }

  const handleNgoSelected = (id) => {
    navigate(`/info/${id}`)
  }

  const toggleModal = () => {
    setModal(!modal);
  }

  const fetchVolunteerNgos = async () => {
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
      <div>Welcome back {userInfo.username}!</div>
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

                    <button disabled={disabled} onClick={toggleModal}
                      className="volunteer-btn">{volunteer}
                    </button> 

                  </div>      
                </div>    
    
                {modal && (      
                  <div className="modal">
                    <div className="modal-background">
                      <div className="modal-popup">
                        <div className="modal-content">
                          <div className="left-side">
                            <img className="modal-image" src={image} alt="volunteers"/> 
                          </div>

                          <div className="right-side">
                            <div className="close-btn-row"><GrFormClose className="close-btn" onClick={toggleModal}/>
                            </div>

                            <div className="right-side-content">
                              <p className="registering">You are registering for this event: </p>
                              <p className="text">Event: <span>{ngo.event_description}</span></p>
                              <p className="text">Date: <span>{ngo.event_date}</span></p>
                              <p className="text">Time: <span>{ngo.event_time}</span></p>  
                              <p>Please enter your contact info so we can get in touch with you</p>

                              <div className="contact-info">
                                <input className="name" type="text" name="name" placeholder="Full name"/>
                                <input className="email" type="text" name="email" placeholder="Email"/>
                              </div>

                              <div className="confirm" onClick={handleRegister}>Confirm</div>
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
              })}
            </div> 
          </div>  
          <Footer/>
        </div>
        )
      }

export default Volunteer;




