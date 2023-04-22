import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/altru.png'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const { setUser, token, setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const { email, password } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }
  
  const home = () => {
    navigate('/')
  }

  const handleSignup = () => {
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email)
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
        localStorage.setItem('token', res.data.token);
        setUser(data.user)
        setToken(data.token);
        console.log(data.user.firstname, data.user.lastname, data.user._id);
        localStorage.setItem('user', data.user)
        navigate('/volunteer')
      } catch (err) {
        console.log(err, 'Incorrect password or email')
        setError('Incorrect email or password. Please try again.');
        navigate('/login')
    };
  };

  return (
    <>
      <img onClick={home} className="login-logo" src={logo} style={{ width: 130, height: 40 }} alt="logo" />

      <div className="login-wrapper">      
        <div className="login-card">
          <h2>Login</h2>
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
          <p className="error">{error}</p>
          <button type="submit" className="login-submit" onClick={handleSubmit}>Log in</button>
                        
          <div className="new-account">
            <div className="no-account"> Don't have an account?</div> 
            <div className="register" onClick={handleSignup}>Sign Up</div>
          </div>
        </div>
      </div>
    </>
    )
  }

export default Login