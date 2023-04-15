import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
// import VolunteerList from './VolunteerList'
import './VolunteerInfo.css'

const VolunteerInfo = () => {
  const { user } = useContext(AuthContext)


  return (
    <div className="container">
      <div className="history">
        <h2>Events attended:</h2>
        <p>{user.attending}</p>
      
      <div className="next-events">
        <h2>Upcoming events</h2>
        <p></p>
      </div>
      </div>
    </div>
  )
}

export default VolunteerInfo