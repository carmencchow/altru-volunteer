import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { DonationsContext } from '../context/DonationsContext'
import { FiltersContext } from '../context/FiltersContext'
import { FiltersProvider } from '../context/FiltersContext';
import { NgosContext } from '../context/NgosContext'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import CurrentAmount from './CurrentAmount'
import Remaining from './Remaining'
import Donations from './Donations'
import DonationModal from './DonationModal'
import Goal from './Goal'
import Navbar from '../components/Navbar'
import './Donate.css'

const Donate = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { goalAmount, totalAmount } = useContext(DonationsContext)
  const { token } = useContext(AuthContext);
  const { ngos, setNgos } = useContext(NgosContext)
  const [ setErrorMessage ] = useState('')
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ pageCount, setPageCount ] = useState(1)
  const [ currentAmount ] = useState(0)
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();


  const volunteer = () => {
    navigate('/volunteer');
  }

  const handleClearAmount = () => {
    currentAmount('');
  }

  const handlePrevious = () => {
    console.log('pre page')
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    console.log('next page')
    setCurrentPage(currentPage + 1);
  }

  const handleAmountChange = (e) => {
    setFilters({ ...filters, category: e.target.value});
  }
  
  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchFilteredNgos()
  }

  const handleNgoSelected = (id) => {
    navigate(`/info/${id}`)
    console.log(id)
  }

  const handleDonation = () => {
    console.log('Donating amount')
    // open modal
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
      const amount = filters.amount 
      const category = filters.category 
      const res = await axios.get(`http://localhost:5000/api/ngos/${amount}/${category}`);  
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

      <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      <div className="stats">

        <Goal/>
        <Remaining/>
        <Donations/>

        <div className="todayContainer">
          <div className="today-text">Today's amount: </div>
          <div className="today-amount">${totalAmount}</div>
          <button className="clear-amount" onClick={handleClearAmount}>Reset</button>
          <button className="donate-now" onClick={handleDonation}>Give Now</button>
        </div>

        <DonationModal 
          open={openModal} 
          onClose={() => setOpenModal(false)}/>
    
      </div>

      <div className="filters">

        <form className="dropdown">
          <select value={filters.amount} onChange={handleAmountChange}>  
          <option value="all"> --- Amount Needed --- </option>
          <option value="$10-$25">$10.00 - $25.00</option>
          <option value="$26-$50">$25.00 - $50.00</option>
          <option value="$51-$75">$51.00 - $75.00</option>                        
          <option value="$76-$100">$76.00 - $100.00</option>                        
          <option value="$101">$100.00+</option>                        
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

        <button onClick={volunteer}>I am interested in volunteering</button>


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
                  <CurrentAmount/>
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

export default Donate;








