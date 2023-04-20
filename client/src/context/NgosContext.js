import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])
  const [ngo, setNgo] = useState(null)
  const [ngoId, setNgoId] = useState('')

  const getNgo = async () => {
    try{
      const res = await axios.get(`http://localhost:5000/api/ngos/${ngoId}`)
      setNgoId(res.data);
      setNgoId(res.data._id)
    } catch(e){
      console.log(e);
    }
  }

  useEffect (() => {
    getNgo();
  }, [])

  return (
    <NgosContext.Provider value={{ 
      ngos, setNgos, 
      getNgo,
      ngo, setNgo,
      ngoId, setNgoId,
    }}>
      {children}
    </NgosContext.Provider>
  );
}
