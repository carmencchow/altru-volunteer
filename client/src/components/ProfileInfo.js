import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import './ProfileInfo.css'

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { user, getUser, userId, ngoId } = useContext(AuthContext)
  
  const handleEdit = (e) => {
    navigate('/edit')
  }

  // Unfollow NGO
  const handleUnfollow = async () => {
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
      getUser();
      } catch (e) {
        console.log(e);
      }
  }


  return (
    
    <div>  
      <h3>User Profile</h3>
      <div className="edit-row">    
        <div className="user-profile">  
          <p className="contact"></p>
          <p>User: {user.firstname} {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Member since: {user.createdAt}</p>
          <button onClick={handleEdit} 
          className="edit-btn">Edit Profile</button>

        </div>

        <div className="user-image">
          <div className="avatar"></div>
          <p>Update profile photo</p>
        </div>
        
      </div>

      <div className="following">
        <h3>Organizations followed:</h3>
        </div>
 
        <div className="organizations">
          {Object.keys(user.following).map(follow => (
            <div>
              {user.following[follow]}
              <button className="unfollow-btn" onClick={handleUnfollow}>Unfollow</button>
              </div>
            ))}
        
      </div>
    </div>
  )
}

export default ProfileInfo

