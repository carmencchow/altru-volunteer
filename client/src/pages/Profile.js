import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import DonationsInfo from '../components/DonationsInfo'
import VolunteerInfo from '../components/VolunteerInfo'
import ProfileInfo from '../components/ProfileInfo'
import Navbar from '../components/Navbar'
import './Profile.css'

const Profile = () => {
  const { user, setUser } = useContext(AuthContext)
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx)
  }

  if (!user) return null;

  return (
    <>
    <Navbar/>
      <div className="profile-container">
        <div className="tabs-container">
        <div className="heading-tabs">
          <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"} 
          onClick={() => toggletabs(1)}>My Profile</div>

          <div className={toggleState === 2 ? "tabs  active-tabs" : "tabs"} 
          onClick={() => toggletabs(2)}> Donations</div>

          <div className={toggleState === 3 ? "tabs  active-tabs" : "tabs"} 
          onClick={() => toggletabs(3)}>Volunteer</div>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? "content active-content" : "content"}>
            <div><ProfileInfo/></div>
          </div>

          <div className={toggleState === 2 ? "content active-content" : "content"}>
            <div><DonationsInfo/></div>
          </div>

          <div className={toggleState === 3 ? "content active-content" : "content"}>
            <div><VolunteerInfo/></div>
          </div>

        </div>
      </div>
    </div>
  </>
  )
}

export default Profile