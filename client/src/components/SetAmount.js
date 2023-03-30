import React, { useState } from 'react'

const SetAmount = () => {
  
  const [amount, setAmount] = useState('$0')
  
  const handleAmount = (e) => {
    console.log('Other amount is: ', e.target.value)
    setAmount(e.target.value)
  }

  return (
    <div>
      <input 
        type="text" 
        className="choose-amount" 
        placeholder="Other amount"
        value={amount} 
        onChange={handleAmount}
        >
      </input>
    </div>
  )
}

export default SetAmount