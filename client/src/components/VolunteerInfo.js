import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className="container">
      <h2>Events</h2>
      <p className="event-heading">
        <p>Namead</p>
        <p>Organization</p>
        <p>Date</p>
      </p>
zz
      <div className="next-event">
        <div className="list">
          <p className="name">
            {(user.attending).map(attend => (
              <div key={attend}>{attend}</div>
            ))}
          </p>

          <p className="org">
            {(user.host).map(ngo => (
              <div key={ngo}>{ngo}</div>
            ))}
          </p>

          <p className="date">
            {(user.calendar).map(day => (
              <div key={day}>{day}</div>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VolunteerInfo