import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { FcGoogle } from 'react-icons/fc'
import { SiFacebook } from 'react-icons/si'
import axios from 'axios'
import './Login.css'

const Login = () => {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email, formData.password)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData, 

      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
      });
        const data = res.data;
        console.log(data);
        localStorage.setItem('token', res.data.token);
        setUser({ email: data.email })
        setToken(data.token);
        getUser();
      } catch (err) {
        console.log(err, 'Incorrect password or email')
    };
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      setUser(res.data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Link to="/main" className="link">Home</Link>

    <div className="login-wrapper">
       <form> 
        <div className="form-wrapper">
          <div className="form-content">
          <h3 className="Signup">Log in to your account</h3>
          <div className="form-username">
            <p>Email address</p>
            <input 
              name="email"
              type="email" 
              placeholder="Enter your email" 
              value={email}   
              onChange={handleChange}  
            />
          </div>

        {error && <div><strong>Error:</strong>{error}</div>}

          <div className="form-password">
            <p>Password</p>
            <input 
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={handleChange}    
            />
          </div>
          
          <p className="forgot"><Link to={'/forgot'}>Forgot password</Link></p>
          <button type="submit" className="submit" onClick={handleSubmit}>Sign In</button>
          <div className="buttons">      
          
          <button className="google-row">
            <FcGoogle className="icon"/>
            <p>Continue with Google</p>
          </button>
          
          <button className="facebook-row">
            <SiFacebook className="icon"/>
            <p>Continue with Facebook</p>
          </button>

          <div className="new-account">
            <p className="no-account"> Don't have an account?</p> 
            <Link to="/signup">
            <p className="register">Sign Up</p>
            </Link>
          </div>
  
          </div>
        </div>

      </div>
    </form>
  </div>

  </>

  )
}

export default Login