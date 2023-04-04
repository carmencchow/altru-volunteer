import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { FiltersContext } from '../context/FiltersContext'
import { FiltersProvider } from '../context/FiltersContext';
import { NgosContext } from '../context/NgosContext'
import { useNavigate } from 'react-router-dom'
import './Volunteer.css'
import Navbar from '../components/Navbar'

const Volunteer = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { token } = useContext(AuthContext);
  const { ngos, setNgos } = useContext(NgosContext)
  const [ setErrorMessage ] = useState('')
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ pageCount, setPageCount ] = useState(1)
  const navigate = useNavigate();

  const donate = () => {
    navigate('/donate');
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
    fetchFilteredNgos()
  }

  const handleNgoSelected = (id) => {
    navigate(`/info/${id}`)
    console.log(id)
  }

  // const fetchAllNgos = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/ngos/', { headers: { Authorization: 'Bearer ' + token }})  
  //     setNgos(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     setErrorMessage('Unable to fetch list of NGOs')
  //   } 
  // };

  const fetchFilteredNgos = async () => {
    try {
      const frequency = filters.frequency 
      // const amount = filters.amount 
      const category = filters.category 
      const res = await axios.get(`http://localhost:5000/api/ngos/${frequency}/${category}`);  
      setNgos(res.data);
      console.log(res.data.frequency);
    } catch (err) {
      setErrorMessage('Unable to fetch results');
    }
  };

  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/4)); 
    }, [ngos.length]) 

  // useEffect(() => {
  //   fetchAllNgos();
  //   }, []);

  return (
    <div>
      <Navbar/>

      <div className="filters">
    
        <form className="dropdown">
          <select value={filters.frequency} onChange={handleFrequencyChange}>  
          <option value="all"> --- Frequency --- </option>
          <option value="upcomin">Upcoming Event</option>
          <option value="weekly">Every Week</option>
          <option value="monthly">Once a Month</option> 
          </select>
        </form>

        <form className="dropdown">
          <select value={filters.category} onChange={handleCategoryChange}>
          <option value="all"> --- All categorys --- </option>
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

        <button onClick={donate}>I am interested in donating</button>


      </div>

      <div className="display">
        <div className="results-container">
          {ngos?.slice((currentPage - 1) * 5, currentPage * 5).map((ngo, idx) => {
            return (
              <div className="display-container">
                <div key={idx} className="row">
                <button className="infoBtn" onClick={() => handleNgoSelected(ngo._id)}>
                  {ngo.name}</button>
                  <p>{ngo.category}</p>
        
                <div className="rightside">
                  
                </div>          
              </div> 
            </div> 
            )
          })}
        </div> 
      </div>  
    </div>
    )
  }

export default Volunteer;




