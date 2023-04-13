import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
// import { FcGoogle } from 'react-icons/fc'
// import { SiFacebook } from 'react-icons/si'
import logo from '../assets/altru2.png'
import background from '../assets/volunteer1.jpg'
import './Login.css'

const Login = () => {
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
    <div className="background" style={{ backgroundImage: `url(${background})`}}>
      <div className="banner">
        <div className="logo-wrapper">
          <img src={logo} style={{ width: 200, height: 100 }} alt="logo" />
            <Link className="signup-btn" to="/signup">
            <p className="register">Sign Up</p>
            </Link>
        </div>
          <h3 className="signup-text">Log in to your account</h3>
            
          <div className="login-inputs">
            <div className="email-input">
              {/* <p>Email address</p> */}
                <input 
                  name="email"
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}   
                  onChange={handleChange}  
                />
            </div>
      
            {error && <div><strong>Error:</strong>{error}</div>}

            <div className="password-input">
              {/* <p>Password</p> */}
                <input 
                  name="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={handleChange}    
                />
            </div>

            <button type="submit" className="login-submit" onClick={handleSubmit}>Sign In</button>
          </div>
                          
          {/* <div className="new-account">
            <p className="no-account"> Don't have an account?</p> 
            <Link to="/signup">
            <p className="register">Sign Up</p>
            </Link>
          </div> */}
    
        </div>
      </div>
    )
  }

export default Login