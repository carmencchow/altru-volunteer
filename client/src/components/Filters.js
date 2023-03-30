import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
// import { DonationsContext, DonationsProvider } from '../context/DonationsContext'
import { AuthContext } from '../context/AuthContext'
import { FiltersContext } from '../context/FiltersContext'
import { NgosContext } from '../context/NgosContext'
import { useNavigate, Link } from 'react-router-dom'
import { BiMap, BiWorld } from 'react-icons/bi'
// import { VscOrganization } from 'react-icons/vsc'
import SetAmount from '../components/SetAmount'
import TodaysAmount from '../components/TodaysAmount'
import StripeCheckout from 'react-stripe-checkout'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import './Filters.css'

const Filters = () => {
  const { filters, setFilters } = useContext(FiltersContext) 
  const { token, setToken } = useContext(AuthContext);
  // const { donation, setDonation } = useContext(DonationsContext)
  const { ngos, setNgos } = useContext(NgosContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [amount, setAmount] = useState('$0')
  const [goalAmount, setGoalAmount] = useState('$0')
  const [donatedAmount, setDonatedAmount] = useState('$0')
  const [leftAmount, setLeftAmount] = useState('$0')
  const [todaysAmount, setTodaysAmount] = useState('0')
  
  const navigate = useNavigate();

  // Stripe Payment
  const makePayment = token => {
    const body = {
      token, 
      todaysAmount
    }
    const headers = {
      "Content-Type": "application/json"
    }
    return fetch('http://localhost:5000/api/payment', {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response)
    })
    .catch(err => console.log(err));
  }

  // Pagination buttons
  const handlePrevious = () => {
    console.log('pre page')
    setCurrentPage(currentPage - 1);
  }

  const handleNext = () => {
    console.log('next page')
    setCurrentPage(currentPage + 1);
  }

  const addAmount = (e) => {
    // Add to currentAmount
    let amount = e.target.value
    // // reducer? 
    // amount += amount
    toast.success(`$${amount} added`)
    console.log(amount, 'added')
    setTodaysAmount(e.target.value)
  }

  // Fire function that updates today's donation ... reducer?
  const donation = () => {
    console.log(`You are donating $ {} today`)
    
    // setFilters({ ...filters, amount: e.target.value});
    // console.log(e.target.value)

  }

  const clearAmount = () => {
    setAmount(0)
    console.log('Clearing amount')
  }

  const amountLeft = () => {
    console.log(`You are $ {} away from meeting your donation goal!`)
    // goalAmount - amountLeft
  }

  const amountDonated = () => {
    console.log(`You have donated $ {}`)
  }

  const handleAmountChange = (e) => {
    setFilters({ ...filters, amount: e.target.value});
    console.log(e.target.value)
  }

  const handleRegionChange = (e) => {
    setFilters({ ...filters, region: e.target.value }); 
    // Only change value of region to the one user selected
  }

  const handleCauseChange = (e) => {
    setFilters({ ...filters, cause: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchFilteredNgos()
  }

  const handleNgoSelected = (id) => {
    navigate(`/info/${id}`)
    console.log(id)
  }

  const fetchAllNgos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ngos/', { headers: { Authorization: 'Bearer ' + token }})  
      setNgos(res.data);
      console.log(res.data);
    } catch (err) {
      setErrorMessage('Unable to fetch list of NGOs')
    } 
  };

  const fetchFilteredNgos = async () => {
    try {
      const location = filters.region 
      const cause = filters.cause 
      const res = await axios.get(`http://localhost:5000/api/ngos/${location}/${cause}`);    
      setNgos(res.data);
      console.log(res.data.location);
    } catch (err) {
      setErrorMessage('Unable to fetch results');
    }
  };

  // Update the page count state whenever the NGO list is updated
  useEffect(() => { 
    setPageCount(Math.ceil(ngos.length/5)); // Total number of pages
    }, [ngos.length]) // Length of NGO list chnages
  
  // Display list of NGOs when page loads for the first time
  useEffect(() => {
    fetchAllNgos();
    }, []);

  return (
    <div>

      <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      
      <div className="stats">

        <div className="goalContainer">
          <div className="goal-text">Your Donations Goal:</div>          
          <div className="donated-amount">${}</div>
        </div>

        <div className="donatedContainer">
          <div className="donated-text">Amount Donated:</div>
          <div className="donated-amount">${}</div>
        </div>

        <div className="leftContainer">
          <div className="left-text">Amount Left:</div>
          <div className="left-amount">${}</div>
        </div>

        <div className="todayContainer">
          <div className="today-text">Today's amount: </div>
          <div className="today-amount">${todaysAmount}</div>
        </div>
     
        <div className="stripeContainer">
          <div className="stripe-text">Would you like to donate this amount?</div>
          <StripeCheckout 
            // TEST CC: 4242 4242 4242 4242; 12/34; 123
            stripeKey="pk_test_51L1kSgAoNhpouPlcfYHS4qZk7puLHRnuQFurkS8DelIS2DvAgtPR5nM4DWIdI3rjZCUyhkg9USb34AEQBf2Zz32r00TiqYY6E9"
            // Token fires a method
            token={makePayment}
            name="Your donation"
            amount={todaysAmount * 100}
          />
        </div>
      </div>

      <div className="filters">
        <h1 className="heading">Organizations</h1>

        <form className="dropdown">
          <select value={filters.amount} onChange={handleAmountChange}>  
          <option value="all"> --- Amount Needed --- </option>
          <option value="$10-$25">$10.00 - $25.00</option>
          <option value="$25-$40">$25.00 - $40.00</option>
          <option value="$40-$55">$40.00 - $55.00</option>                        
          <option value="$55-$75">$55.00 - $75.00</option>                        
          </select>
        </form>
    
        <form className="dropdown">
          <select value={filters.region} onChange={handleRegionChange}>  
          <option value="all"> --- All Regions --- </option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="middle east">Middle East</option>
          <option value="south america">South America</option>                        
          </select>
        </form>

        <form className="dropdown">
          <select value={filters.cause} onChange={handleCauseChange}>
          <option value="all"> --- All Causes --- </option>
          <option value="animal welfare">Animal Welfare</option>
          <option value="children">Children</option>
          <option value="education">Education</option>
          <option value="environment">Environment</option>
          <option value="hunger">Hunger</option>
          <option value="womens rights">Women's Rights</option>
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
                <p className="name">{ngo.name}</p>
                <p className="location"><BiMap/>{ngo.location[0]}</p>
        
                <div className="rightside">

                  <TodaysAmount/>

                  {/* <button className="" value="10" onClick={addAmount}>$10</button>

                  <button className="" value="25" onClick={addAmount}>$25</button>

                  <button className="" value="50" onClick={addAmount}>$50</button>

                  <SetAmount/> */}

                  <button className="infoBtn" onClick={() => handleNgoSelected(ngo._id)}>{/* <VscOrganization/> */}
                  Profile</button>   
        
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

export default Filters;








