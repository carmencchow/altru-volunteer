import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { FiltersContext } from '../context/FiltersContext'
import { FiltersProvider } from '../context/FiltersContext'
import { AuthContext } from '../context/AuthContext'
import { NgosContext } from '../context/NgosContext'
import { useNavigate } from 'react-router-dom'
import { GrFormClose } from "react-icons/gr"
import Navbar from '../components/Navbar'
import './Volunteer.css'

const Volunteer = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { token } = useContext(AuthContext);
  const { ngos, setNgos } = useContext(NgosContext)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ pageCount, setPageCount ] = useState(1)
  const [ modal, setModal ] = useState(false)
  const [ volunteer, setVolunteer ] = useState('Volunteer now')
  const [ input, setInput ] = useState('')
  const [ confirm, setConfirm ] = useState('')
  const [disabled, setDisabled ] = useState(false)

  const navigate = useNavigate();

  const handleRegister = () => {
    // Thank you for registering
    setConfirm('Thank you. Please check your email for confirmation')
    // Change 'volunteer' status to 'attending'
    setVolunteer('Attending')
    // Disable onClick
    setDisabled(true)
        // Update backend
    // update profile
    // Decrement volunteer number by 1
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
        <div className="filters">
    
        <form className="dropdown">
          <select value={filters.frequency} onChange={handleFrequencyChange}>  
          <option value="all"> --- Frequency --- </option>
          <option value="day">One Day Events</option>
          <option value="weekly">Every Week</option>
          <option value="monthly">Once a Month</option> 
          </select>
        </form>

        <form className="dropdown">
          <select value={filters.category} onChange={handleCategoryChange}>
          <option value="all"> --- All categories --- </option>
          <option value="animals">Animals</option>
          <option value="children & youth">Children & Youth</option>
          <option value="education & literacy">Education & Literacy</option>
          <option value="environment">Environment</option>
          <option value="health & medicine">Health & Medicine</option>
          <option value="sports & recreation">Sports & Recreation</option>
          </select>
        </form>
        
        <button className="searchBtn" onClick={handleSubmit}>Search</button>
    
        <div className="pagination">
          <button disabled={currentPage === 1} className="previous" onClick={handlePrevious}>Previous</button>
          <p>{currentPage} / {pageCount}</p>
          <button disabled={currentPage === pageCount} className="next" onClick={handleNext}>Next</button> 
        </div>

      </div>

      <div className="display">
        <div className="results-container">
          {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
            return (
              <div className="display-container">
                <div key={idx} className="row">
                <button 
                  className="infoBtn" 
                  onClick={() => handleNgoSelected(ngo._id)}>
                  {ngo.name}</button>
                <div className="rightside">
                  <p>{ngo.category}</p>
                  <p>Volunteers needed: {ngo.num_volunteers}</p>
                  <p>Commitment: {ngo.commitment}</p>
                  <p>Date: {ngo.event_date}</p>
                  <p>Time: {ngo.event_time}</p>
                  <p>{ngo.event_description} Description</p>
                </div>          
              </div>    
    
          {modal && (      
            <div className="modal">
              <div className="modal-background">
                  <div className="modal-popup">
                      <div className="modal-content">
                        <div className="right-side">
                          <GrFormClose className="close-btn" onClick={toggleModal}/>
                        </div>
                        <h1>You are registering for this event: </h1>
                      </div>
                      <div>
                      
                        <p>Thank you for your interest in volunteering with {ngo.name}</p>
                        <p>Date: {ngo.event_date}</p>
                        <p>Time: {ngo.event_time}</p>
                        <p>{ngo.event_description} Description</p>

                        <p>Please enter your contact info so we can get in touch with you</p>

                        <input type="text" name="name" placeholder="Full name"/>
                        <input type="text" name="email" placeholder="Email"/>

                      </div>
                      <button onClick={handleRegister}>Confirm</button>
                      <p>{confirm}</p>
                    </div>
                   </div>
                </div>
              )} 
              
            <button disabled={disabled} onClick={toggleModal}
              className="modal-btn">{volunteer}
            </button> 

              {/* Toggle volunteer status */}


            </div>
            )
          })}
        </div> 
      </div>  
    </div>
    )
  }

export default Volunteer;




