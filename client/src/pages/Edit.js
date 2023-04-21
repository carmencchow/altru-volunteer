import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {getUser} from '../utils/getUser'
import axios from 'axios'
import Navbar from '../components/Navbar'
import './Profile.css'
import './Edit.css'

const Edit = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext)
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [toggleState, setToggleState] = useState(1);

  const toggletabs = (idx) => {
    setToggleState(idx)
  }

  const handleFirstname = (e) => {
    setFirstname(e.target.value)
  }

  const handleLastname = (e) => {
    setLastname(e.target.value)
  }

  const handleUpdate = async () => {
    try {
      console.log("Saving changes", firstname, lastname);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const res = await axios.put(
        `http://localhost:5000/api/user/${user._id}`,

        { 
          firstname: `${firstname}`,
          lastname: `${lastname}` 
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      await getUser(user._id, setUser);
      navigate('/profile')
    } catch (err) {
      console.log(err);
    }
  }

  const profile = () => {
    navigate('/profile')
  }

  const handleDelete = async () => {
    console.log('Deleting your account')
    await axios.delete(`http://localhost:5000/api/user/${user._id}`)
      .then((res) => {
      console.log(`Account deleted`, res.data);
      navigate('/');
    });
  };
  
  return (
    <>
    <Navbar/>
      <div className="profile-container">
        <div className="tabs-container">
          <div className="heading-tabs">
            <div className="tabs active-tabs">
            <div onClick={profile}>My Profile</div>
            </div>
          </div>

            <div className="content-tabs">
              <div className="content active-content"><div>

              <h3>User Info</h3>

              <div className="row">
                <p>First name:</p>
                <p>Last name:</p>
              </div>

              <div className="row">
                <input type="text" 
                  className="form-control"
                  placeholder='' 
                  value={firstname}
                  onChange={handleFirstname}
                />

                <input type="lastname" 
                  className="form-control"
                  placeholder='' 
                  value={lastname}
                  onChange={handleLastname}
                />
              </div>

              <button className="update-btn" onClick={handleUpdate}>Save Changes</button>

              <div><button className="delete-btn" onClick={handleDelete}>Delete Account</button></div>

            </div> 
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
export default Edit