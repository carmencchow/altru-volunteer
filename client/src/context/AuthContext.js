import { createContext, useState} from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      { children }
    </AuthContext.Provider>
  )
}