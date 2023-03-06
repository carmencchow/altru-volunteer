import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // try {
    //   await login(email, password);
    //   navigate('/home');
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <p className="Signup">Log in to your account</p>
          <div className="form-username">
            <input 
              name="email"
              type="text" 
              placeholder="Enter your email" 
              value={email}   
              onChange={(e) => setEmail(e.target.value)}    
            />
          </div>

    {error}
          <div className="form-password">
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}    
            />
          </div>
          
          <p className="forgot">Forgot password</p>
          <button type="submit" className="submit">Sign In</button>
          <div className="buttons">      
          
          <button className="google"><FcGoogle className="icon"/>Continue with Google</button>
          <button className="facebook"><SiFacebook className="icon"/>Continue with Facebook</button>

          <div className="new-account">
            <p className="no-account"> Don't have an account?</p> 
            <Link to="/signup">
            <p className="register">Sign Up</p>
            </Link>
          </div>
  
        </div>
      </div>
    </form>
  </div>

  )
}

export default Login