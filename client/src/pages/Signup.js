import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, password, confirmPassword } = formData

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(password !== confirmPassword){
      console.log('Passwords do not match')
    } else {
      const userData = { 
        name,
        email,
        password,
      }
    }
  }

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
              value={name} 
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
s             value={email} 
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
              value={password} 
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
              value={confirmPassword} 
              id="confirmPassword"
              onChange={handleChange}
            />
          </div>

          <div className="buttons">      
            <button className="signup" type="submit" onClick={handleSubmit}>Sign Up</button>

          </div>
        </div>

      </form>
    </div>

  )
}

export default Signup