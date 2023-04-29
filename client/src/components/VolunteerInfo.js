import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  const {user} = useContext(AuthContext)
console.log(user)
  return (
    <div className="container">
      <h2>Events</h2>
      <p className="event-heading">
        <p>Name</p>
        <p>Organization</p>
        <p>Date</p>
      </p>

      {/* <h1>{JSON.stringify(user.attending)}</h1> */}

      {/* Fetch NGO with that id and print out event name */}

      <div className="next-event">
        <div className="list">
          <p className="name">
            {(user.attending).map(attend => (
              <div key={attend._id}>
                <p className="name">{attend.name}</p>
                <p className="date">{attend.date}</p>
              </div>
            ))}
          </p>

          {/* <p className="org">
            {(user.host).map(ngo => (
              <div key={ngo}>{ngo}</div>
            ))}
          </p>

          <p className="date">
            {(user.calendar).map(day => (
              <div key={day}>{day}</div>
            ))}
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default VolunteerInfo