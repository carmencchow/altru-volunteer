import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import EditGoal from './EditGoal'
import './DonationsInfo.css'

const DonationsInfo = () => {
  const {user} = useContext(AuthContext)
  const [openInput, setOpenInput] = useState(false)
  const [total, setTotal] = useState('$0')

  // Calculate amount left to reach goal
  
  return (
    <div className="container">
      <div className="stats">
        <div className="row">
          <h3>Goal Amount: {user.goalAmount}</h3>

           <div className="input-field">
            <EditGoal
              openInput={openInput}
              closeInput={() => {setOpenInput(false)}}
            />

            {!openInput ? (
              <div className="edit-amount" onClick={() => {
                setOpenInput(true);
              }}>
                <button className="edit">Edit goal amount</button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        <h3>Amount needed to reach donation goal: </h3>
      </div>
      
      <div className="history">
        <h3>Donation history: </h3>
        <p>
          {Object.keys(user.donations).map(donation => (
            <div donation={donation}>
              {user.donations[donation]}
            </div>
          ))}
        </p>

        <h4>Total Amount Donated: 
          <p>${user.donations.reduce((a,b) => a + b, 0)}</p>
        </h4>
        

      </div>
      </div>
    </div>
  )
}

export default DonationsInfo