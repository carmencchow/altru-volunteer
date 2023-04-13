import { createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => { 
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const navigate = useNavigate(); 

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      throw error;
    }
  };


  useEffect(() => {
    if (user === null){
      navigate('/')
    } else {
      navigate('/volunteer')
      getUser()
    }

  }, [user])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      { children }
    </AuthContext.Provider>
  )
}