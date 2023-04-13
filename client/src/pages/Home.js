import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/altru.png'
import background from '../assets/volunteer1.jpg'
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }
  
  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <div className="background" style={{ backgroundImage: `url(${background})`}}>
      <div className="banner">
        <div className="logo-wrapper">
          <img className="home-logo" src={logo} style={{ width: 120, height: 36 }} alt="logo" />
            <div className="buttons">
              <div className="login-btn" onClick={handleLogin}>Login</div>
              <div className="signup-btn" onClick={handleSignup}>Signup</div>
            </div>
        </div>
          <div className="home-text">
            <p className="welcome-text">Welcome to Altru, your volunteer platform</p>
            <p className="sub-text">"When Action Meets Compassion, Lives Change."</p>                
             </div>
        </div>
      </div>
    )
  }

export default Home