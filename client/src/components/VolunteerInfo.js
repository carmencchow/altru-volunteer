import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className="container">
      <div className="next-events">
        <h2>Events</h2>
        {(user.attending).map(attend => (
          <div>{attend}</div>
        ))}

        {(user.host).map(ngo => (
          <div>{ngo}</div>
        ))}

        {(user.calendar).map(day => (
          <div>{day}</div>
        ))}

      </div>
    </div>
  )
}

export default VolunteerInfo