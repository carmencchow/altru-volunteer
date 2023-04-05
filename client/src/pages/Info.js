import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs';
import axios from 'axios'
import './Info.css'
import StripeCheckout from "react-stripe-checkout";

const Info = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ favorite, setFavorite ] = useState('');
  const [ favorites, setFavorites ] = useState([]);
  const [ amount, setAmount ] = useState(0);
  const [ donation, setDonation ] = useState(0)
  const [ ngo, setNgo ] = useState({
    // _id: '', name: '', category: [], location: [], website: '', tag: '' 
  });

  const fetchNgo = async () => {
    const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    setNgo(res.data)
    console.log(res.data)
  }

  useEffect (() => {
    fetchNgo();
  }, [])


  // Stripe Payment
  const selectAmount = (e) => {
    setAmount(e.target.value)
    console.log(amount, e.target.value);
  }

  const handlePayment = token => {
    const body = {
      token, 
      donation
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
      <Navbar/> <Tabs/>
      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <span className="follow" onClick={handleFollow}>Follow {ngo.name}</span> 
        <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
      </div>
        <p>Donate to {ngo.name}</p>        

      <div className="donation-card">
        <p>Please select a donation amount: </p>
        <div className="donation-options">
          <div className="amount-btn" onClick={selectAmount} value="10">$10</div>
          <div className="amount-btn" onClick={selectAmount} value="25">$25</div>
          <div className="amount-btn" onClick={selectAmount} value="30">$30</div>
        </div>
        <div className="donation-options">
          <div className="amount-btn" onClick={selectAmount} value="50">$50</div>
          <div className="amount-btn" onClick={selectAmount} value="75">$75</div>
          <div className="amount-btn" onClick={selectAmount} value="100">$100</div>
        </div>

        <div className="donation-options">
          <input 
            type="text" 
            className="donation-input"
            value={amount}
            placeholder='other amount'
            onChange={selectAmount}
          />                              
        </div> 

        <div className="donor-info">
          <div className="column">
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
              amount={donation * 100}/> 
          </div> 
        </div> 
      </div>
    )
  }

export default Info