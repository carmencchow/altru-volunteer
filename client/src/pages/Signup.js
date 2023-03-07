import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import './Signup.css'
import { useAuth } from '../context/AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase';

const Signup = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    if(password !== confirmPassword){
      setError("Passwords do not match");
    } else {
      await register(email, password).then((res) => {
        console.log(res)
        navigate('/main');
      }).catch((err) => {
        setError(err.message)
        console.log(err.message)
      })
    }
  }

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <h3>Sign up for a new account</h3>
          <div className="form-email">
            <input 
              name="email" 
              type="text" 
              placeholder="Enter your email" 
              value={email}   
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>

          <div className="form-password">
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>

          <div className="form-confirm-password">
            <input 
              name="password" 
              type="password" 
              placeholder="Confirm your password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}  
            />
          </div>

          { error && <span><strong>Error:</strong>{error}</span>}

          <div className="buttons">      
            <button className="signup" type="submit" onClick={register}><Link to="/login">Sign up</Link></button>

          </div>
        </div>

      </form>
    </div>

  )
}

export default Signup