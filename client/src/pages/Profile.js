import React from 'react'
import Navbar from '../components/Navbar'
import './Profile.css'
import { BsPencil } from 'react-icons/bs'

const Profile = () => {
  return (
    <section>
      <Navbar/>
      <div className="user-profile">
      <h1>My Profile</h1>
      <div className="my-profile">
        <p className="name"></p>
        <button className="edit"><BsPencil/>Edit Profile</button>
      </div>


        <div className="events">Events</div>
        <div className="events">Donations</div>
        <div className="events">Volunteer hours</div>

        <div className="favourites">
          <h3>Favourited Organizations</h3>
        </div>
        
      </div>
    </section>
  )
}

export default Profile