import React from 'react'

const VolunteerBtn = ({ ngo, clickedBtn, setClickedBtn, toggleModal, disabled }) => {

  return (
    <button 
      className="volunteer-btn"
      disabled={disabled} 
      onClick={() => {
      // console.log(ngo.name, ngo._id)
      setClickedBtn(ngo)
      toggleModal(ngo)
    }}>
      {/* {clickedBtn ? 'Attending' : 'Sign up'} */}
    </button> 
  )
}

export default VolunteerBtn

