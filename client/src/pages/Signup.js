import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { register, reset } from '../features/auth/authSlice'
import './Signup.css'
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader'

const Signup = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get from state:
  // const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if(isError) {
  //     console.log(message)
  //     toast.error(message);
  //   }

  //   // User successfully registered
  //   if (isSuccess || user){
  //     navigate('/main')
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleChange = (e) => {
    // setFormData((prevState) => ({
    //   ...prevState, 
    //   [e.target.name]: e.target.value,
    // }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // if(password !== confirmPassword){
    //   toast.error('Passwords do not match');
    // } else {
    //   const userData = { 
    //     name,
    //     email,
    //     password,
    //   }
    //   dispatch(register(userData)); //dispatch register function from authSlice
    // }
  }

  // if (isLoading){
  //   return <Loader/>
  // }

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <h3>Sign up for a new account</h3>
          <div className="form-group">
            <input 
              name="name" 
              type="text" 
              placeholder="Enter your name" 
              // value={name} 
              className="form-control"  
              id="name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input 
              name="email" 
              type="text" 
              placeholder="Enter your email" 
              // value={email} 
              className="form-control"  
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input 
              name="password" 
              type="password" 
              className="form-control"  
              placeholder="Enter your password" 
              // value={password} 
              id="password"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input 
              name="confirmPassword" 
              type="password" 
              className="form-control"  
              placeholder="Confirm your password" 
              // value={confirmPassword} 
              id="confirmPassword"
              onChange={handleChange}
            />
          </div>

          { error && <span><strong>Error:</strong>{error}</span>}

          <div className="buttons">      
            <button className="signup" type="submit" onClick={handleSubmit}>Sign Up</button>

          </div>
        </div>

      </form>
    </div>

  )
}

export default Signup