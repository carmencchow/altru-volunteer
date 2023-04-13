import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import logo from '../assets/altru.png'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, token, setToken } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log('User signed out');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout')
      setUser(null)
      setToken('')
      await localStorage.clear();
      navigate('/login');
      
    } catch (err) { 
      console.log(err, 'Unable to log out')
    }

  }
  return (
    <nav>
      <div className="navbar">
        <img className="logo" src={logo} style={{ width: 120, height: 40 }} alt="logo" />
      
        <div className="logout-btn" onClick={handleLogout}>Logout</div>
      </div>
      
    </nav>
  )
}

export default Navbar;




