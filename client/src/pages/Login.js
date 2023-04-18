import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/altru.png'
import Footer from '../components/Footer'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const { user, userId, setUserId, setUser, token, setToken } = useContext(AuthContext);
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
  
  const handleHome = () => {
    navigate('/')
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
        localStorage.setItem('token', res.data.token);
        // Set the state of the user
        setUser(data.user)
        setUserId(data.user._id)
        console.log('User and userId is:', data, data.user._id);
        setToken(data.token);
        localStorage.setItem('user', data.user)
      } catch (err) {
        console.log(err, 'Incorrect password or email')
    };
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('data.user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <img onClick={handleHome} className="login-logo" src={logo} style={{ width: 130, height: 40 }} alt="logo" />

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
      {/* <Footer/> */}
    </>
    )
  }

export default Login