import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BsPencil } from 'react-icons/bs'
import './ProfileInfo.css'

const Profile = () => {
  const { id } = useParams(); 
  const [ email, setEmail ] = useState('')
  const [ openInput, setOpenInput ] = useState(false)
  const [ user, setUser ] = useState({})

  const getUser = async () => {
    const res = await axios.get(`http://localhost:5000/api/auth/users/${id}`)
    setUser(res.data)
  }

  const toggleInput = () => {
    setOpenInput(!openInput)
  }  
  
  const handleEdit = (e) => {
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
      getUser();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    
    <div>  
      <div className="edit-row">      
        <p>Carmen Chow {user.username}</p>
        <p>reach.cchow@gmail.com {user.email}</p>
        <BsPencil onClick={toggleInput} className="edit-icon"/>
      </div>
        
      <div className="email-row">
        <input type="text" 
          className="edit-input"
          placeholder="New email" 
          value={email}
          onChange={handleEdit}
        />
        <div className="save-email-btn" onClick={handleSave}>Save</div> 
      </div>

      <div className="following">
        <h3>Organizations followed:</h3>
 
        <div className="follow">
          <p>Clean Air Alliance</p>
          <p>Unfollow</p>
        </div>

        <div className="follow">
          <p>Sick Kids Hospital</p>
          <p>Unfollow</p>
        </div>

        <div className="follow">
          <p>Toronto Humane Society</p>
          <p>Unfollow</p>
        </div>

      </div>
    </div>
  )
}

export default Profile

