import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import DonationsList from './DonationsList'
import './DonationsInfo.css'

const DonationsInfo = () => {
  const {user, getUser } = useContext(AuthContext)
  const [input, setInput] = useState('$0')
  const [goalAmount, setGoalAmount] = useState('$0')
  const [openInput, setOpenInput] = useState(false)
  const [totalAmount, setTotalAmount] = useState('$0')

  const handleTotalAmount = () => {
  
  }

  const handleGoal = (e) => {
    setInput(e.target.value)
  }
  
  const handleOpenInput = () => {
    console.log('open input')
    setOpenInput(!openInput)
  }

  const saveGoal = () => {
    setGoalAmount(input)
    setInput('')
  }

  return (
    <div className="container">
      <div className="stats">
      <div className="other-amount">
        <h3>Set Goal Amount: </h3>
          $<input 
            type="text" 
            className="donation-input"
            value={input}
            placeholder='50.00'
            onChange={handleGoal}
          />                              
          <div className="save-btn" onClick={saveGoal}>Save</div>
        </div>
        
        
        <h3>Goal Amount: {goalAmount}</h3>
        <button onClick={handleOpenInput}>Edit Amount</button>
        <h3>Total Amount Donated: {totalAmount}</h3>
        <h3>Amount needed to reach donation goal: </h3>

      </div>
      
      <div className="history">
        <h3>Donations made:</h3>
        <p>
          {Object.keys(user.donations).map(donation => (
            <div donation={donation}>
              {user.donations[donation]}
            </div>
          ))}
        </p>
      </div>
    </div>
  )
}

export default DonationsInfo