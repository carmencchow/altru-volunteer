import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/altru2.png'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSignup = () => {
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email, formData.password)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData, 
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
      }
      );
        const data = res.data;
        console.log(data);
        localStorage.setItem('token', res.data.token);
        setUser({ email: data.email })
        setToken(data.token);
      } catch (err) {
        console.log(err, 'Incorrect password or email')
    };
  };

  return (
  
    <div className="container">
      <div className="login-card">
        <img src={logo} style={{ width: 200, height: 100 }} alt="logo" />

        <div className="email-input">
          <p>Email address</p>
            <input 
              name="email"
              type="email" 
              placeholder="Enter your email" 
              value={email}   
              onChange={handleChange}  
            />
        </div>
    
        {/* {error && <div><strong>Error:</strong>{error}</div>} */}

        <div className="password-input">
          <p>Password</p>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={handleChange}    
            />
        </div>

        <button type="submit" className="login-submit" onClick={handleSubmit}>Log in</button>
                      
        <div className="new-account">
          <div className="no-account"> Don't have an account?</div> 
          <div className="register" onClick={handleSignup}>Sign Up</div>
        </div>
      </div>
    </div>
    )
  }

export default Login