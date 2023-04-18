import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { NgosContext } from '../context/NgosContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BsPencil } from 'react-icons/bs'
import './ProfileInfo.css'

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { user, userId } = useContext(AuthContext)
  const { ngoId } = useContext(NgosContext)
  const { id } = useParams(); 
  const [ email, setEmail ] = useState('')
  const [ openInput, setOpenInput ] = useState(false)

  const toggleInput = () => {
    setOpenInput(!openInput)
  }  
  
  const handleEdit = (e) => {
    navigate('/edit')
  }

  const handleUpdate = (e) => {
    setEmail(e.target.value)
  }

  // Unfollow NGO
  const handleUnfollow = async (ngoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.delete(
        `http://localhost:5000/api/user/${userId}/follow/ngo`,        
        { 
          follow: `${ngoId}`
        },
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const data = res.data;
      console.log(data)
      // getUser();
      } catch (e) {
        console.log(e);
      }
  }

  const handleSave = async (userId, e) => {
    console.log(`New email ${email}`)
    console.log('editing email', email)
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.put(
        `http://localhost:5000/api/auth/user/${userId}`,
  
        { 
          email: `${email}`
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
        </div>

        <button onClick={handleEdit} className="edit-btn">Edit Profile</button>

        <div className="user-image">
          <div className="avatar"></div>
          <p>Update profile photo</p>
        </div>
      </div>

      <div className="following">
        <h3>Organizations followed:</h3>
 
        <div className="organizations">
          {Object.keys(user.following).map(follow => (
            <div follow={follow}>
              {user.following[follow]}
              <button onClick={handleUnfollow}>Unfollow</button>
            </div>
          ))}
         
        </div>

      </div>
    </div>
  )
}

export default ProfileInfo

