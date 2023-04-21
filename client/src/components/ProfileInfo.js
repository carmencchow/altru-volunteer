import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import {getUser} from '../utils/getUser'
import axios from 'axios'
import './ProfileInfo.css'

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext)

  const handleEdit = (e) => {
    navigate('/edit')
  }

  // Unfollow NGO
  const handleUnfollow = async (follow) => {
    try {
      console.log(follow)
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${user._id}/unfollow/ngo`,        
        { 
          remove: `${follow}`
        },
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      const data = res.data;
      console.log(data)
      await getUser(user._id, setUser);
      } catch (e) {
        console.log(e);
      }
    }

  return (
    
    <div>  
      <h2>Personal Info</h2>
      <div className="edit-row">    
        <div className="user-profile">  
          <p className="contact"></p>
          <p>User: {user.firstname} {user.lastname}</p>
          <p>Email: {user.email}</p>
          <p>Member since: {user.createdAt}</p>
          <button onClick={handleEdit} 
          className="edit-btn">Edit Profile</button>
        </div>        
      </div>

      <div className="following">
        <h3>Organizations followed:</h3>
 
        <div className="organizations">
          {(user.following).map(follow => (
            <div>
              {follow}
              <button onClick={
                async () => await handleUnfollow(follow)}>Unfollow</button>
            </div>
          ))}
         
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo

