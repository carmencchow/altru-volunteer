import React from 'react'

const VolunteerItem = (props) => {
  return (
    <div>
      <div className="volunteer-item">
        <p>{props.ngo}</p>
        <p>{props.date}</p>
        <p>{props.event}</p>
      </div>      
    </div>
  )
}

export default VolunteerItem
