import React from 'react'
import './VolunteerItem.css'

const VolunteerItem = (props) => {
  return (
    <div>
      <div className="volunteer-item">
        <p>{props.ngo}</p>
        <p>{props.date}</p>
        <p>{props.hours}</p>
      </div>      
    </div>
  )
}

export default VolunteerItem
