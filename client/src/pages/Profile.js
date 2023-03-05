import React from 'react'
import Navbar from '../components/Navbar'

const Profile = () => {
  return (
    <section>
      <Navbar/>
      <h1>My Profile</h1>
      <div className="user-profile">
        <div className="events">Your events</div>
        <div className="events">Your donations</div>
        <div className="events">Your volunteer hours</div>
      </div>
    </section>
  )
}

export default Profile