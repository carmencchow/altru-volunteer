import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import DonationsList from './DonationsList'

const DonationsInfo = () => {
  const {user} = useContext(AuthContext)
  const [input, setInput] = useState(0)
  const [goal, setGoal] = useState(0)

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
        <h3>Goal Amount: ${goal}</h3>
        <h3>Amount Donated: </h3>

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
        <p>{user.donations}</p>
       </div>
    </div>
  )
}

export default DonationsInfo