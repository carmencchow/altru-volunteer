import axios from 'axios';

// Service file: Making HTTP request and sending data in localStorage

const API_URL = 'http://localhost:5000/api/auth/';
// or in frontend package.json add "proxy": "http://localhost:5000"

// Register new user
const register = async (userData) => {
  // Make a request to server, send user data
  const response = await axios.post(API_URL, userData)
  if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}



const authService = { 
  register
}

export default authService; 