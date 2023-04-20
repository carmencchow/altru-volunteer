import React, {useState, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import EditGoal from './EditGoal'
import './DonationsInfo.css'

const DonationsInfo = () => {
  const {user} = useContext(AuthContext)
  const [openInput, setOpenInput] = useState(false)

  return (
    <div className="container">
      <div className="stats">
        <div className="row">
        <h3>Goal Amount: ${user.goalAmount}</h3>
        
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

      </div>
      
      <div className="donation-history">
        <h3>Donation history: </h3>

        <div className="headings">
          <p>Amount</p>
          <p>Organization</p>
        </div>

        <div className="donated-amounts">
          <div className="amounts">
            {Object.keys(user.donations).map(donation => (
              <div className="donation">${user.donations[donation]}</div>
            ))}
          </div>
          <div className="orgs">
            {Object.keys(user.ngos).map(ngo => (
              <div> {user.ngos[ngo]}</div>
            ))}
          </div>
        </div>


        <p>Total Amount Donated:</p> 
            <div>${user.donations.map(Number).reduce((a,b) =>  a + b, 0)}</div>
         
        
        <p>Amount needed to reach donation goal: </p>
          <div>${user.goalAmount - user.donations.map(Number).reduce((a,b) => a + b, 0)}</div>
   

        {user.donations.map(Number).reduce((a,b) =>  a + b, 0) > user.goalAmount} ? (<div>You've reached your goal!</div>) : null 

      </div>
      </div>
    </div>
  )
}

export default DonationsInfo