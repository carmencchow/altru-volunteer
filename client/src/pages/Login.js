import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './Login.css'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value, 'form submitted');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username, 
        password
      });
      console.log(res.data);
    } catch (error) {
      setError(error);
      console.log(error); 
    }
  }

  return (
    <div className="login-wrapper">
    
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <h3 className="login">Sign In to your account / Choose your sign in method</h3>
          <div className="form-username">
            <input 
              name="username" 
              type="text" 
              placeholder="Enter your user name" 
              value={username} 
              onChange={(e) => {setUsername(e.target.value)}}
              
            />
                        <AiOutlineEye/><AiOutlineEyeInvisible/>

          </div>

          <div className="form-password">
            <input 
              name="password" 
              type="text" 
              placeholder="Enter your password" 
              value={password} onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
  
          <div className="buttons">      
            <p>Forgot password</p>
            <button onClick={handleSubmit}>Sign In</button>
          
            <p> OR </p>
            <button><FcGoogle/>Continue with Google</button>
            <button><SiFacebook/>Continue with Facebook</button>

            <p> Don't have an account? <b>Sign Up</b></p>
          </div>
        </div>

      </form>
    </div>

  )
}

export default Login