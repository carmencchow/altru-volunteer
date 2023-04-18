import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])
  const [ngo, setNgo] = useState({})
  const [ngoId, setNgoId] = useState('')

  // const fetchNgo = async (id) => {
  //   const res = await axios.get(`http://localhost:5000/api/ngos/${id}`)
  //   setNgo(res.data)
  // }

  // useEffect (() => {
  //   fetchNgo();
  // }, [])

  return (
    <NgosContext.Provider value={{ 
       ngos, setNgos, 
      // fetchNgo,
      ngo, setNgo,
      ngoId, setNgoId,
    }}>
      {children}
    </NgosContext.Provider>
  );
}
