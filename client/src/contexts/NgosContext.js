import React, { createContext, useState } from 'react'

export const NgosContext = createContext()

export const NgosProvider = ({ children }) => {
  const [ngos, setNgos] = useState([])

  return (
    <NgosContext.Provider value={{ ngos, setNgos }}>
        {children}
    </NgosContext.Provider>
  );
}
