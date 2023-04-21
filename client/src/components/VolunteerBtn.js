import React from 'react'

const VolunteerBtn = ({ ngo, disabled, clickedBtn, toggleModal }) => {

  return (
    <div>
      <button disabled={disabled} onClick={() => {
        console.log(ngo.name, ngo._id)
        toggleModal(ngo)
      }}
        className="volunteer-btn">
      {clickedBtn ? 'Attending' : 'Sign up'}</button> 
    </div>
  )
}

export default VolunteerBtn

