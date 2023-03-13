import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <div className="form-content">
          <h3 className="Signup">Log in to your account</h3>
          <div className="form-username">
            <input 
              name="email"
              type="email" 
              placeholder="Enter your email" 
              value={email}   
              onChange={handleChange}  
            />
          </div>

        {error && <div><strong>Error:</strong>{error}</div>}

          <div className="form-password">
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={handleChange}    
            />
          </div>
          
          <p className="forgot"><Link to={'/forgot'}>Forgot password</Link></p>
          <button type="submit" className="submit">Sign In</button>
          <div className="buttons">      
          
          <button className="google-row">
            <FcGoogle className="icon"/>
            <p>Continue with Google</p>
          </button>
          
          <button className="facebook-row">
            <SiFacebook className="icon"/>
            <p>Continue with Facebook</p>
          </button>

          <div className="new-account">
            <p className="no-account"> Don't have an account?</p> 
            <Link to="/signup">
            <p className="register">Sign Up</p>
            </Link>
          </div>
  
          </div>
        </div>

      </div>
    </form>
  </div>

  )
}

export default Login