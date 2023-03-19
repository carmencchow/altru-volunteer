import React, {useState } from 'react'
import styled from 'styled-components'
import Login from '../pages/Login';
import { Link, useNavigate } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import logo from '../assets/logo.png';
// import { auth } from '../firebase';
import './Navbar.css';
// import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  // const { user } = useContext(AuthContext);
  // const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    // auth.signOut();
    navigate('/')
    alert('Goodbye {user.email}! You are now logged out.')
    console.log('User signed out');
  }
  return (
    <nav>
      <div className="logo">
        <Link className="link" to="/main">
          <div className="logo-wrapper">
            <img src={logo} style={{width: 100, height: 100 }} alt="logo" />
            <p className="logo-text">Altru</p>
          </div>
        </Link> 

        <div className="user-display">
          <div className="welcome"><span className="hi">👋</span> Welcome, ! </div>
        </div>
      </div>

      <div className="nav-login">
        <div className="profile">
          <Link className="avatar-text" to="/profile">
          <RxAvatar className="avatar"/>
          </Link>
        </div>
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


//         {user ? ( 
//  <div className="user-display">
//           <div className="welcome"><span className="hi">👋</span> Welcome, {user.email}! </div>
//           <Link to="/profile"><RxAvatar className="avatar"/></Link>
//           <Link to="/" onClick={handleLogout}>Logout</Link>
//         </div>
//       ) : (
//         <div className="nav-login">
//           {/* <div className="profile"><Link className="avatar-text" to="/profile"><RxAvatar className="avatar"/></Link></div> */}
//           {/* <div className="login-signup"> */}
//             <span className="login"><Link className="button-text" to="/login">Log in</Link></span> 
//             <span className="signup"><Link className="button-text" to="/signup">Sign up</Link></span> 
//           {/* </div> */}
//         </div>
//       )} 

//     {/* </nav>
//   )
// }

// export default Navbar;
//  */}
