import React, { createContext, useState } from 'react'

export const FaveContext = createContext();

export const FaveProvider = ({ children }) => {
  const [addFave, setAddFave] = useState({
    items: [],
  });

  return (
    <FaveContext.Provider value={{ addFave, setAddFave }}>
      {children}
    </FaveContext.Provider>
  )
}