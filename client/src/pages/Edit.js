import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import './Profile.css'
import './Edit.css'

const Edit = () => {
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  })

  const handleEdit = (e) => {
    console.log(e)
    setFormData.firstname(e.target.value)
  }

  const handleSave = () => {}

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
            <div className="tabs active-tabs">My Profile</div>
          </div>

          <div className="content-tabs">
            <div className="content active-content"><div>
            <h4>User Info</h4>

            <div>
              <p>First name:</p>
              <input type="text" 
                className="form-control"
                placeholder={user.username} 
                value={formData.username}
                onChange={handleEdit}
              />

              <p>Last name:</p>
              <input type="text" 
                className="form-control"
                placeholder={user.username} 
                value={formData.username}
                onChange={handleEdit}
              />

              <p>Password:</p>
              <input type="text" 
                className="form-control"
                placeholder={user.password} 
                value={formData.password}
                onChange={handleEdit}
              />

              <p>Email:</p>
              <input type="email" 
                className="form-control"
                placeholder={user.email} 
                value={formData.email}
                onChange={handleEdit}
              />

            <h4>Contact Info</h4>

              <p>Address</p>
              <input type="text" 
                className="form-control"
                placeholder={user.address} 
                value={formData.address}
                onChange={handleEdit}
              />

              <p>City</p>
              <input type="text" 
                className="form-control"
                placeholder={user.city} 
                value={formData.city}
                onChange={handleEdit}
              />

              <p>State/Province</p>
              <input type="text" 
                className="form-control"
                placeholder={user.state} 
                value={formData.state}
                onChange={handleEdit}
              />

              <p>Zipcode/Postal Code</p>
              <input type="text" 
                className="form-control"
                placeholder={user.zipcode} 
                value={formData.zipcode}
                onChange={handleEdit}
              />

              <button className="save-profile" onClick={handleSave}>Save</button> 
          
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    {/* <Footer/> */}
  </>
  )
}

export default Edit