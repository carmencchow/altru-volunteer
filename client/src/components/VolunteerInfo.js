import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  const {user} = useContext(AuthContext)

  return (
    <div className="container">
      <div className="next-events">
        <h2>Upcoming events</h2>
        {user.attending.map((item) => {
          return (
            <div className="row">
              <p>{user.attending[0]}</p>
              <p>{user.attending[1]}</p>
              <p>{user.attending[2]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VolunteerInfo