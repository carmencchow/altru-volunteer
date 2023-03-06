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
        <h2>My Profile</h2>
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
        <h2>Donation goal:   </h2>
        <h2>Donations made:   </h2>
        <h2>Amount remaining to reach goal:   </h2>
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