import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BsPencil } from 'react-icons/bs'
import './ProfileInfo.css'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const { id } = useParams(); 
  const [ email, setEmail ] = useState('')
  const [ openInput, setOpenInput ] = useState(false)

  const toggleInput = () => {
    setOpenInput(!openInput)
  }  
  
  const handleUpdate = (e) => {
    setEmail(e.target.value)
  }

  const handleSave = async (id, e) => {
    console.log(`New email ${email}`)
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/auth/user/${id}`,
  
        { 
          email: `${email}`
        },
  
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    
    <div>  
      <h3>My Profile</h3>
      <div className="edit-row">    
        <div className="user-profile">  
          <p className="contact">Contact Details:</p>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>

          {/* <BsPencil onClick={toggleInput} className="edit-icon"/> */}
        </div>

        <button onClick={handleUpdate} className="edit-btn">Update</button>

        <div className="user-image">
          <div className="avatar"></div>
          <p>Update profile photo</p>
        </div>
      </div>

      <div className="email-row">
        {/* <input type="text" 
          className="edit-input"
          placeholder="New email" 
          value={email}
          onChange={handleEdit}
        /> */}
        <div className="save-email-btn" onClick={handleSave}>Save</div> 
      </div>

      <div className="following">
        <h3>Organizations followed:</h3>
 
        <div className="organizations">
          <div className="follow">
            <p>Clean Air Alliance</p>
            <p className="unfollow">Unfollow</p>
          </div>

          <div className="follow">
            <p>Sick Kids Hospital</p>
            <p className="unfollow">Unfollow</p>
          </div>

          <div className="follow">
            <p>Toronto Humane Society</p>
            <p className="unfollow">Unfollow</p>
          </div>

          </div>
      </div>
    </div>
  )
}

export default Profile

