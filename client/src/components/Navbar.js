import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import logo from '../assets/logo.png'
import Login from '../pages/Login'
import './Navbar.css'
import axios from 'axios'

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
    } catch (err) { 
      console.log(err, 'Unable to log out')
    }

  }
  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/main">
          <div className="logo-wrapper">
            <img src={logo} style={{ width: 100, height: 100 }} alt="logo" />
            <p className="logo-text">Altru</p>
          </div>
        </Link> 
        
      {/* { user ? ( 
        <div className="user-display">
          <div className="welcome">
            <span className="hi">👋</span> 
            Welcome, {user.username}! 
          </div>
        <Link to="/profile"><RxAvatar className="avatar"/></Link>
        <Link to="/logout" onClick={handleLogout}>Logout</Link>
      </div>

        ) : (

        <div className="nav-login">
          <div className="login-signup">
            <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
            <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
          </div>
        </div>
      )}  */}

        <div className="user-display">
          <div className="welcome"><span className="hi"></span> Welcome, ! </div>
        </div>

      </div>

      <div className="nav-login">
        <div className="login-signup">
          <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
          <span className="logout"><Link to="/" onClick={handleLogout}>Logout</Link></span>
          <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
        </div>

      </div>
      
    </nav>
  )
}

export default Navbar;


// { user ? ( 
//   <div className="user-display">
//     <div className="welcome">
//       <span className="hi">👋</span> 
//       Welcome, {user.username}! 
//     </div>
//   <Link to="/profile"><RxAvatar className="avatar"/></Link>
//   <Link to="/logout" onClick={handleLogout}>Logout</Link>
// </div>

//   ) : (
//   <div className="nav-login">
//     <div className="login-signup">
//       <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
//       <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
//     </div>
//   </div>
// )} 

