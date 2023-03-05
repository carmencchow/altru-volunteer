import React from 'react'
import Navbar from '../components/Navbar'
import './Profile.css'

const Profile = () => {
  return (
    <section>
      <Navbar/>
      <div className="user-profile">
      <h1>My Profile</h1>

        <div className="events">Your events</div>
        <div className="events">Your donations</div>
        <div className="events">Your volunteer hours</div>

        <div className="favourites">
          <h3>Favourited Organizations</h3>
          
        </div>
      </div>
    </section>
  )
}

export default Profile