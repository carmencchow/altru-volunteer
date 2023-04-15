import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import StripeCheckout from "react-stripe-checkout";
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import './Info.css'

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ favorite, setFavorite ] = useState('');
  const [ favorites, setFavorites ] = useState([]);
  const [ input, setInput ] = useState(0);
  const [ total, setTotal ] = useState(0)
  const [ ngo, setNgo ] = useState({});

  const [inputValue, setInputValue] = useState("");

  const fetchNgo = async () => {
    const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    setNgo(res.data)
  }

  const handleClick = (event) => {
    setInputValue(event.target.value);
  }

  useEffect (() => {
    fetchNgo();
  }, [])

  // Stripe Payment
  const addAmount = (e) => {
    const clickedAmount = Number(e.target.value);
    // toast.success(`$${clickedAmount} added`)
    setTotal(e.target.value)
    console.log(e.target.value, total) // undefined, NaN
  }

  const handleAmount = (e) => {
    setInput(e.target.value)
  }

  // Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number));
  const saveAmount = (e) => {
    const donation = input.toFixed(2)
    console.log(donation)
  }

  const handlePayment = token => {
    const body = {
      token, 
      total
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

  // Follow NGO
  const handleFollow = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
      console.log(`Adding '${res.data.name}' to favorites list`)
      if (!favorites.includes(res.data.name)){
        setFavorite(res.data.name)  
        setFavorites([...favorites, res.data.name])
        toast.success(`Following ${res.data.name}`) 
        console.log('Favorites list:', favorite, favorites)
      } else {
        toast.success(`Unfollowing ${res.data.name}`)
        setFavorites([...favorites.filter((ngo) => ngo !==res.data.name)])
      }
    } catch (err) {
      console.log(err)
    }

    // try {
    //   const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    //   console.log(`Adding '${res.data.name}' to favorites list`)
    //   if (!favorite.includes(res.data.name)){
    //     favorites.push(favorite)
    //     setFavorite([...favorite, res.data.name])
    //     console.log('Favorites list:', favorite, favorites)
    //   } else {
    //     toast.success(`${res.data.name} removed from favorites`)
    //     console.log(`${res.data.name} removed from favorites`)  
    //     setFavorite([...favorite.filter((ngo) => ngo !==res.data.name)])
    //   }
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <div>
      <Navbar/>
      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <span className="follow" onClick={handleFollow}>Follow {ngo.name}</span> 
        <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      </div>

      <div className="donation-card">
        <h3 className="header">Don't have time to volunteer?</h3> 
        <h3 className="ngo-donation">You can donate to {ngo.name} instead</h3> 
        <p>Your donation amount: </p>
        <div className="donation-options">
          <button className="amount-btn" onClick={handleClick} value="10">$10</button>
          <button className="amount-btn" onClick={handleClick} value="25">$25</button>
          <button className="amount-btn" onClick={handleClick} value="30">$30</button>
        </div>
        <div className="donation-options">
          <button className="amount-btn" onClick={handleClick} value="50">$50</button>
          <button className="amount-btn" onClick={handleClick} value="75">$75</button>
          <button className="amount-btn" onClick={handleClick} value="100">$100</button>
        </div>

        <div className="other-amount"><p className="dollar-sign">$</p>
          <input 
            type="text" 
            className="donation-input"
            value={inputValue}
            placeholder='Other amount'
            onChange={handleAmount}
          />                              
          <div className="save-btn" onClick={saveAmount}>Save</div>
        </div>

        <div className="donor-info">
          <div className="column">
            <input 
              type="text" 
              className="full-name"
              value={input}
              placeholder='Other amount'
              onChange={handleAmount}
            />     
            <p>Full name:</p>
            <p>Street Address:</p>
            <p>City:</p>
          </div>
          <div className="column">
            <p>Province/State:</p>
            <p>Postal/ZIP Code:</p>
            <p>Email address: </p>
          </div>        
        </div>

        <div className="process">
          {/* <div className="payment" onClick={handlePayment}>
            Process
          </div>  */}
          {/* TEST CC: 4242 4242 4242 4242; 12/34; 123 */}
            <StripeCheckout stripeKey= "pk_test_51L1kSgAoNhpouPlcfYHS4qZk7puLHRnuQFurkS8DelIS2DvAgtPR5nM4DWIdI3rjZCUyhkg9USb34AEQBf2Zz32r00TiqYY6E9"
              token={handlePayment}
              name="Your donation"
              amount={total * 100}/> 
          </div> 
        </div> 
      </div>
    )
  }

export default Info