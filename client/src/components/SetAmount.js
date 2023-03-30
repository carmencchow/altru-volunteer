import React, { useState } from 'react'

const SetAmount = () => {
  
  const [amount, setAmount] = useState('$0')
  
  const handleAmount = (e) => {
    console.log('Other amount is: ', e.target.value)
    setAmount(e.target.value)
  }

  const saveAmount = (e) => {
    console.log('Saving amount', e.target.value)
  }

  // Set donation amount with this 

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
      <button onClick={saveAmount}>Save</button>
    </div>
  )
}

export default SetAmount