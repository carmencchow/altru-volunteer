import React, { createContext, useState } from 'react'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])
  const [ngo, setNgo] = useState({})
  const [ngoId, setNgoId] = useState('')

  return (
    <NgosContext.Provider value={{ 
       ngos, setNgos, 
      ngo, setNgo,
      ngoId, setNgoId,
    }}>
      {children}
    </NgosContext.Provider>
  );
}
