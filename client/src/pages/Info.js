import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { getUser} from '../utils/getUser'
import StripeCheckout from "react-stripe-checkout";
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import AmountBtn from '../components/AmountBtn'
import logo from '../assets/altru.png'
import './Info.css'

const Info = () => {
  const navigate = useNavigate();
  const { userId, setUser } = useContext(AuthContext);
  const {id} = useParams();
  const [ngo, setNgo] = useState({});
  const [total, setTotal] = useState(0)
  const [clickedBtn, setClickedBtn] = useState('0');
  const [ disabled, setDisabled ] = useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const fetchNgo = async () => {
    const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
    setNgo(res.data)
  }
    
  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  const handleAddressInput = (e) => {
    setAddress(e.target.value)
  }

  const handleCityInput = (e) => {
    setCity(e.target.value)
  }

  const handlePostalInput = (e) => {
    setPostal(e.target.value)
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handleProvinceInput = (e) => {
    setProvince(e.target.value)
  }

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${userId}/donation`,        
        { 
          donation: `${clickedBtn}` 
          // donation: newAmount 
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
      console.log(data)
      await getUser(userId, setUser);
      } catch (e) {
        console.log(e);
      }
    }

  const amounts = [10, 25, 50, 75, 100]

  useEffect (() => {
    fetchNgo();
  }, [])

  const handlePayment = token => {
    handleConfirmation();
    console.log('Payment')
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

  // Add NGO to follow
  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        // console.log(ngo.name)
        `http://localhost:5000/api/user/${userId}/follow/ngo`,        
        { 
          follow: `${ngo.name}`
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
      console.log(data)
      await getUser(userId, setUser);
      } catch (e) {
        console.log(e);
      }
    }


  return (
    <div>
      <Navbar/>
      <div> 
        <span className="back" onClick={() => navigate(-1)}>Back</span>
        <button className="follow" onClick={handleFollow}>Follow {ngo.name}</button> 
        <Toaster position="top-center" toastOption={{ duration: 3000 }}/>
        <span className="header1">Don't have time to volunteer with {ngo.name}?</span> <br></br>
        <span className="header2">Would you like to make a donation instead?</span>
        
      </div>

      <div className="donation-card">
        <p>Select an amount to donate: </p>

        <p className="confirmation">{confirmation}</p>
          
        <div className="donation-options">
          {amounts.map((amount) => {
            return(
              <AmountBtn 
                amount={amount}
                clickedBtn={clickedBtn}
                setClickedBtn={setClickedBtn}
              />
            )
          })}
        </div>

      <div className="donor-info">
        <h3>Donor Information</h3>
        <div className="column">
          <p>Name:</p>
          <input type="text" className="form-control" value={name} onChange={handleNameInput}/>
          <p>Address:</p>
          <input type="text" className="form-control" value={address}
          onChange={handleAddressInput}/>
        </div>
        <div className="column">
          <p>City:</p>
          <input type="text" className="form-control" value={city}
          onChange={handleCityInput}/>
          <p>Province/State:</p>
          <input type="text" className="form-control" value={province}
          onChange={handleProvinceInput}/>
        </div>
        <div className="column">
          <p>Postal/ZIP Code:</p>
          <input type="text" className="form-control" value={postal}
          onChange={handlePostalInput}/>
          <p>Email address: </p>
          <input type="text" className="form-control" value={email}
          onChange={handleEmailInput}/>
        </div>        
      </div>

      <div className="process">
        {/* TEST CC: 4242 4242 4242 4242; 12/34; 123 */}
        <StripeCheckout stripeKey= "pk_test_51L1kSgAoNhpouPlcggVUZyCuhwjZKomWM4sK8IrNj9OI3OumyeYeNkOrSPTrshrj8vbjJdA82r7FBgKueeUOzNbk00vJ7IMMjT"
          image={logo} 
          token={handlePayment}
          name="Donating"
          amount={total * 100}/> 
      </div> 
      
      </div> 
    </div> 
  )
}

export default Info