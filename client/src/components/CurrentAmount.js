import React, { useState, useContext, useEffect } from 'react'
import { DonationsContext } from '../context/DonationsContext'
import toast, { Toaster } from 'react-hot-toast'
import './CurrentAmount.css'

const CurrentAmount = () => {
  const [total, setTotal] = useState(0)
  const [amount, setAmount] = useState('$0')
  const { currentAmount, setCurrentAmount, setTotalAmount, totalAmount } = useContext(DonationsContext)

  const addAmount = (e) => {
    const clickedAmount = Number(e.target.value);
    toast.success(`$${clickedAmount} added`)
    setTotal(total + clickedAmount)
  }

  const handleAmount = (e) => {
    console.log('Other amount is: ', e.target.value)
    setAmount(e.target.value)
  }

  const saveAmount = (e) => {
    console.log('Saving amount', setAmount, e.target.value)
  }

  useEffect(() => {
    setTotalAmount(totalAmount + total) 
    // setTotalAmount((prev) => {
    //   return prev + total 
    // })
    // setTotalAmount(totalAmount + total) * alt to lines 19-20 (from Context)
  }, [total])

  return (
    <div>
      <div className="rightside">
        <button className="" value="10" onClick={addAmount}>$10</button>
        <button className="" value="25" onClick={addAmount}>$25</button>
        <button className="" value="50" onClick={addAmount}>$50</button>
        
        <input 
          type="text" 
          className="other-amount" 
          placeholder="Other amount"
          value={total} 
          onChange={handleAmount}
          >
        </input>
        <button onClick={saveAmount}>Save</button>
      </div>
    </div>
  )
}

export default CurrentAmount
