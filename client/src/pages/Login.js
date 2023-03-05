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
          <h3 className="Signup">Sign In to your account / Choose your sign in method</h3>
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
  
          <div className="buttons">      
            <p>Forgot password</p>
            <button type="submit">Sign In</button>
          
            <p> OR </p>
            <button><FcGoogle/>Continue with Google</button>
            <button><SiFacebook/>Continue with Facebook</button>

            <p> Don't have an account? 
              <Link to="/signup">
                <b>Sign Up</b>
              </Link>
            </p>
          </div>
        </div>

      </form>
    </div>

  )
}

export default Login