import React, { createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 

  const getUser = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user === null){
      navigate('/')
    } else {
      navigate('/volunteer')
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ 
      user, setUser, 
      userId, setUserId,
      token, setToken, 
      getUser
    }}>
      { children }
    </AuthContext.Provider>
  )
}