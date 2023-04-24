import React from 'react'
import './VolunteerBtn.css'

const VolunteerBtn = ({ ngo, disabled, clickedBtn, toggleModal }) => 
{
  return (
    <div className="volunteer">
      <button disabled={disabled} onClick={() => {
        console.log(`Clicked button is:', ${clickedBtn}`)
        console.log('Button clicked:', ngo.name, ngo._id)
        toggleModal(ngo)
      }}
        className="volunteer-btn">{clickedBtn ? 'Attending' : 'Sign up'}
      </button> 
    </div>
  )
}

export default VolunteerBtn

