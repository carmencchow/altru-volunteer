import React, { useState } from 'react'
import DonationsList from './DonationsList'

const DonationsInfo = () => {
  const [ input, setInput ] = useState(0)
  const [ goal, setGoal ] = useState(0)

  const handleGoal = (e) => {
    setInput(e.target.value)
  }
  
  const saveGoal = () => {
    setGoal(input)
    setInput('')
  }

  return (
    <div className="container">
      <div className="stats">
        <h3>Goal Amount: {goal}</h3>
        <h3>Amount Donated: $64.00</h3>

        <div className="other-amount">
          $<input 
            type="text" 
            className="donation-input"
            value={input}
            placeholder='Other amount'
            onChange={handleGoal}
          />                              
          <div className="save-btn" onClick={saveGoal}>Save</div>
        </div>

      </div>
      
      <div className="history">
        <h3>Donations made:</h3>
        <DonationsList/>
      </div>
    </div>
  )
}

export default DonationsInfo