import React from 'react'
import Navbar from '../components/Navbar'
import './Profile.css'
import { BsPencil } from 'react-icons/bs'

const Profile = () => {
  return (
    <div>
      <Navbar/>

    <div className="container">

      {/*------ Section 1: -------*/}
      <div className="user-profile">
        <p>My Profile</p>
        <div className="my-profile">
          <p className="name"></p>
          <button className="edit"><BsPencil/>Edit Profile</button>
        </div>
      </div>

      {/*------ Section 2: -------*/}
      <div className="favourites">
        <h3>Favourited Organizations</h3>
      </div>

      <div className="tracker">
        <p>Goal</p>
        <p>Made</p>
        <p>Remaining</p>
      </div>
      

      <div className="activity">
        <p className="events">Events</p>
        <p className="events">Donations</p>
        <p className="events">Volunteer hours</p>
      </div>

    </div>
    </div>
  )
}

export default Profile