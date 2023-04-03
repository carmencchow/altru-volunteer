import React, { createContext, useState } from 'react'

export const DonationsContext = createContext();

export const DonationsProvider = ({ children }) => {
  const [goalAmount, setGoalAmount] = useState(0)
  const [donatedAmounts, setDonatedAmounts] = useState([])
  const [remainingAmount, setRemainingAmount] = useState(0)
  const [currentAmount, setCurrentAmount] = useState(0)
  const [clickedAmount, setClickedAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)

  const getHistory = (id) => {}

  return (
    <DonationsContext.Provider value={{ 
      goalAmount, 
      setGoalAmount, 
      donatedAmounts, 
      setDonatedAmounts, 
      remainingAmount, 
      setRemainingAmount, 
      currentAmount, 
      setCurrentAmount,
      clickedAmount,
      setClickedAmount,  
      getHistory,
      total,
      setTotal,
      totalAmount,
      setTotalAmount 
    }}> 
      {children}
    </DonationsContext.Provider>
  );
}

