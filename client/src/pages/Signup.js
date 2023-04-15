import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/altru.png'
import { useSignup } from '../hooks/useSignup'
import Footer from '../components/Footer'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // const { signup, error, isLoading } = useSignup()

  const handleHome = () => {
    navigate('/')
  }

  const { name, email, password, confirm } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // await signup(email, password) // from useSignup hook

    // if(password !== confirmPassword){
    //   console.log('Passwords do not match')
    // } else {
    //   const userData = { 
    //     name,
    //     email,
    //     password,
    //   }
    console.log('Returning', formData.name, formData.email, formData.password)
    // }

    // await signup(email, password)
  }

  return (
    <>
      <img onClick={handleHome} className="signup-logo" src={logo} style={{ width: 130, height: 40 }} alt="logo" />

      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Sign up</h2>

          <div className="name-input">
            <input 
              name="name" 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={handleChange}
            />
          </div>

          <div className="email-input">
            <input 
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={handleChange}
            />
          </div>

          <div className="password-input">
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={handleChange}
            />
          </div>

          <div className="confirm-input">
            <input 
              name="confirm" 
              type="password" 
              placeholder="Confirm your password" 
              value={confirm} 
              onChange={handleChange}
            />
          </div>

          <button className="signup-submit" type="submit" onClick={handleSubmit}>Sign Up</button>

          </div>
        </div>
        <Footer/>
      </>
    )
  }

export default Signup