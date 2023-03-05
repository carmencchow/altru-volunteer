import React from 'react'
import styled from 'styled-components'
import Login from '../pages/Login';
import  Home from '../pages/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import logo from '../assets/logo.png';
import { auth } from '../firebase';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding: 0px 20px 20px 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`

const Button = styled.button`
  margin-left: 10px;
  cursor: pointer;
`

const Span = styled.span`
  text-decoration: none;
  color: blue;
`

const Navbar = ({ auth, user}) => {
  
  return (
    <Nav>
      <Span className="logo">
        <Link className="link" to="/">
          <img src={logo} style={{width: 80, height: 80 }} alt="logo" />Altru
        </Link> 
      </Span>

      {user ? (
        <div>
          <p>{auth.user.email}</p>
          <Link to="/profile">My Profile</Link>
          <RxAvatar/> 
          <Link to="/profile">Logout</Link>
        </div>
      ) : (
        <div>Please login 
          <Link to="/login">Individual</Link>
          <Link to="/login">Organization</Link>
        </div>

      )} 

    </Nav>
  )
}

export default Navbar;

