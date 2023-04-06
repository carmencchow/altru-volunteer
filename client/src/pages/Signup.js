import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSignup } from '../hooks/useSignup'
import './Signup.css'

const Signup = () => {
  // const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  // const { signup, error, isLoading } = useSignup()

  const { name, email, password, confirmPassword } = formData

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
              value={email} 
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
            {/* <button disabled={isLoading} className="signup" type="submit" onClick={handleSubmit}>Sign Up</button>

            {error && <div className="error">{error}</div>} */}

          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup