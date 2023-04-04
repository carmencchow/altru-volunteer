import React, { createContext, useState } from 'react'

export const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(900)
  const [donatedAmounts, setDonatedAmounts] = useState([])
  const [remainingAmount, setRemainingAmount] = useState(0)
  const [currentAmount, setCurrentAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)

  return (
    <DonationsContext.Provider value={{ 
      total,
      setTotal,
      goalAmount, 
      setGoalAmount, 
      totalAmount,
      setTotalAmount,
      donatedAmounts, 
      setDonatedAmounts, 
      remainingAmount, 
      setRemainingAmount, 
      currentAmount, 
      setCurrentAmount, 
    }}> 
      {children}
    </DonationsContext.Provider>
  );
}

