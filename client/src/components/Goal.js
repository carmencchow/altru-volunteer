import React, { useState } from 'react'

const Goal = () => {
  const [ goal, setGoal] = useState('');

  const handleSetGoal = (e) => {
    console.log('Donation goal: ', e.target.value)
    setGoal(e.target.value)
  }

  const handleSave = () => {
    console.log('set new donation amount')
  }

  return (
    <div>
      <div className="goalContainer">
        <div className="goal-text">
          Your Donations Goal: $100
        </div>          
        
        <input 
          type="text" 
          className="goal-amount" 
          placeholder="Donation amount" 
          value={goal}
          onChange={handleSetGoal}>
        </input>

        <button onClick={handleSave}>Save Goal</button>
      </div> 
    </div>
  )
}

export default Goal
