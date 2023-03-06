import React from 'react'
import styled from 'styled-components'
import Login from '../pages/Login';
import  Home from '../pages/Home';
import { Link } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import logo from '../assets/logo.png';
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ auth, user}) => {
  
  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/">
          <div className="logo-wrapper">
          <img src={logo} style={{width: 100, height: 100 }} alt="logo" />
          <p className="logo-text">Altru</p>
          {/* // If user is logged in display this message: */}
          {/* <p>Hello {auth.user.email}</p> */}
          </div>
        </Link> 
      </div>

      {user ? (
        <div>
          <p>{auth.user.email}</p>
          <Link to="/profile">My Profile</Link>
          <RxAvatar/> 
          <Link to="/profile">Logout</Link>
        </div>
      ) : (
        <div className="nav-login">
          <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
          <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
        </div>

      )} 

    </nav>
  )
}

export default Navbar;

