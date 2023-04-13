import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import logo from '../assets/logo.png'
import Login from '../pages/Login'
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
      <div className="logo">
        <p className="logo-text">Altru</p>
        <span className="logout"><Link to="/" onClick={handleLogout}>Logout</Link></span>
      { user ? ( 
        <div className="user-display">
          {/* <div className="welcome">Welcome {user.email}!</div>
          <Link to="/logout" onClick={handleLogout}>Logout</Link> */}
      </div>

        ) : (

        <div className="nav-login">
          {/* <div className="login-signup">
            <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
            <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
          </div> */}
        </div>
      )} 
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

