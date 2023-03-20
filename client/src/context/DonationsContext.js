import React, { createContext, useState } from 'react'

export const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [amount, setAmount] = useState();

  return (
    <DonationsContext.Provider value={{ amount, setAmount }}> 
      {children}
    </DonationsContext.Provider>
  );
}

