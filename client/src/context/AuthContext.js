import { createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user === null){
      navigate('/')
    } else {
      navigate('/volunteer')
      // getUser()
    }

  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      { children }
    </AuthContext.Provider>
  )
}