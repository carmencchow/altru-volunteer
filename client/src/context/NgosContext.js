import React, { createContext, useState } from 'react'
import axios from 'axios'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])
  const [ngo, setNgo] = useState({})
  const [ngoId, setNgoId] = useState('')


  const fetchNgo = async () => {  
    try{
      const res = await axios.get(`http://localhost:5000/api/ngos/${ngo._id}`)
      setNgo(res.data)
    } catch(e){
      console.log(e);
    }
  }
  
  return (
    <NgosContext.Provider value={{  
      fetchNgo,
      ngo, setNgo,
      ngos, setNgos,
      ngoId, setNgoId,
    }}>
      {children}
    </NgosContext.Provider>
  );
}
