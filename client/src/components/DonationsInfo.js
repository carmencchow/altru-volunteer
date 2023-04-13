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
        <p>Goal Amount: {goal}</p>
        <p>Amount Donated: $64.00</p>

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
        <DonationsList/>
        {/* <p>Donations 1</p>
        <p>Donations 2</p>
        <p>Donations 3</p>
        <p>Donations 4</p> */}
      </div>
    </div>
  )
}

export default DonationsInfo