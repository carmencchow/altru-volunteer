import React from 'react'
import './VolunteerBtn.css'

const VolunteerBtn = ({ attending, toggleModal }) => 
{
  return (
    <div className="volunteer">
      <button disabled={attending} onClick={() => {
        toggleModal()
      }}
        className="volunteer-btn">{attending ? 'Attending' : 'Sign up'}
      </button> 
    </div>
  )
}

export default VolunteerBtn

