import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/altru.png'
import './Signup.css'

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('Passwords do not match');
  const { user, userId, setUserId, setUser, token, setToken } = useContext(AuthContext);

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleFirstname = (e) => {
    setFirstname(e.target.value)
  }

  const handleLastname = (e) => {
    setLastname(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirm = (e) => {
    setConfirm(e.target.value)
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
      }

      if(password === confirm){
        const res = await axios.post('http://localhost:5000/api/auth/signup', formData, 
      
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
        });
          const data = res.data;
          console.log('New user:', data.token, data.user)
          localStorage.setItem('token', data.token);
          setUser(data.user)
          setToken(data.token);
          localStorage.setItem('user', data.user)
          navigate('/login')
      } else {
        console.log('Passwords do not match')
        setError('Incorrect email or password. Please try again.');
        navigate('/signup')
      };  
    } catch (err) {
      console.log(err, 'Incorrect password or email')
      setError('Signup failed, incorrect email or password. Please try again.');
    };
  };
 
  const homepage = () => {
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <img onClick={homepage} className="signup-logo" src={logo} style={{ width: 130, height: 40 }} alt="logo" />

      <div className="signup-wrapper">
        <div className="signup-card">
          <h2>Sign up</h2>

          <div className="name-row">
            <div className="firstname-input">
              <input 
                name="firstname" 
                type="text" 
                placeholder="  Enter your first name" 
                value={firstname} 
                onChange={handleFirstname}
              />
            </div>

            <div className="lastname-input">
              <input 
                name="lastname" 
                type="text" 
                placeholder="  Enter your last name" 
                value={lastname} 
                onChange={handleLastname}
              />
            </div>
          </div>

          <div className="email-input">
            <input 
              name="email" 
              type="email" 
              placeholder="  Enter your email" 
              value={email} 
              onChange={handleEmail}
            />
          </div>

          <div className="password-input">
            <input 
              name="password" 
              type="password" 
              placeholder="  Enter your password" 
              value={password} 
              onChange={handlePassword}
            />
          </div>

          <div className="confirm-input">
            <input 
              name="confirm" 
              type="password" 
              placeholder="  Confirm your password" 
              value={confirm} 
              onChange={handleConfirm}
            />
          </div>

          <button className="signup-submit" type="submit" onClick={handleSubmit}>Sign Up</button>

          <div className="account">
            <div className="my-account">Already have an account?</div> 
            <div className="login" onClick={handleLogin}>Login</div>
          </div>

          </div>
        </div>
      </>
    )
  }

export default Signup