import React, { useState } from 'react'
import SetAmount from '../components/SetAmount'
import toast, { Toaster } from 'react-hot-toast'

const TodaysAmount = () => {
  const [todaysAmount, setTodaysAmount] = useState('$0')
  const [amountClicked, setAmountClicked] = useState('$0')
  const [total, setTotal] = useState('$0')

  const amounts = []

  const addAmount = (e) => {
    let amountClicked = e.target.value
    toast.success(`$${amountClicked} added`)
    console.log('Amounts: ', amounts)
    let addAmount = amounts.push(amountClicked);
    let sum = amounts.reduce((a, b) => Number(a) + Number(b));
    console.log('Sum:', sum)
  }

  return (
    <div>
      <div className="rightside">
        <button className="" value="10" onClick={addAmount}>$10</button>
        <button className="" value="25" onClick={addAmount}>$25</button>
        <button className="" value="50" onClick={addAmount}>$50</button>
        <SetAmount/> 
      </div>
    </div>
  )
}

export default TodaysAmount
