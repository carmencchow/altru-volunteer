import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Username: ${username}, password: ${password}`);
    dispatch()
    
    // try {
    //   const res = await axios.post('http://localhost:5000/api/auth/login', {
    //     username, 
    //     password
    //   });
    //   console.log(res.data, username, password);
    // } catch (error) {
    //   setError(error);
    //   console.log(error); 
    // }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username'){
      setUsername(value);
    } else if (name === 'password'){
      setPassword(value);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}> 
        <div className="form-wrapper">
          <h3 className="login">Sign In to your account / Choose your sign in method</h3>
          <div className="form-username">
            <input 
              name="username" 
              type="text" 
              placeholder="Enter your user name or email" 
              value={username}   
              onChange={handleInputChange}    
            />
          <AiOutlineEye/><AiOutlineEyeInvisible/>
          </div>

          <div className="form-password">
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={handleInputChange}    
            />
          </div>
  
          <div className="buttons">      
            <p>Forgot password</p>
            <button type="submit">Sign In</button>
          
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