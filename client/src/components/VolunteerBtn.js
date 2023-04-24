import React from 'react'
import './VolunteerBtn.css'

const VolunteerBtn = ({ attending, toggleModal }) => 
{
  return (
    <div className="volunteer">
      <button disabled={attending} onClick={() => {
        // console.log(`Clicked button is:', ${clickedBtn}`)
        // console.log('Button clicked:', ngo.name, ngo._id)
        toggleModal()
      }}
        className="volunteer-btn">{attending ? 'Attending' : 'Sign up'}
      </button> 
    </div>
  )
}

export default VolunteerBtn

