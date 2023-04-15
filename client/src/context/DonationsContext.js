import React, { createContext, useState } from 'react'

export const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(0)
  const [donatedAmounts, setDonatedAmounts] = useState([])
  const [remainingAmount, setRemainingAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  return (
    <DonationsContext.Provider value={{ 
      goalAmount, 
      setGoalAmount, 
      totalAmount,
      setTotalAmount,
      donatedAmounts, 
      setDonatedAmounts, 
      remainingAmount, 
      setRemainingAmount, 
    }}> 
      {children}
    </DonationsContext.Provider>
  );
}

