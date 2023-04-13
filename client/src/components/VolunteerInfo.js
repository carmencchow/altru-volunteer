import React from 'react'
import VolunteerList from './VolunteerList'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  return (
    <div className="container">
      <div className="history">
        <VolunteerList/>
      </div>

      <div className="next-events">
        <p>Next event:</p>
        <p>Girl Guides Bake Sale on August 23rd at 1:30pm</p>
      </div>
    </div>
  )
}

export default VolunteerInfo