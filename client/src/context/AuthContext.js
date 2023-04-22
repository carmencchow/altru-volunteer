import React, { createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 

  // useEffect(() => {
  //   if (user === null){
  //     navigate('/')
  //   } else {
  //     navigate('/volunteer')
  //   }
  // }, [user])

  return (
    <AuthContext.Provider value={{ 
      user, setUser, 
      token, setToken, 
    }}>
      { children }
    </AuthContext.Provider>
  )
}