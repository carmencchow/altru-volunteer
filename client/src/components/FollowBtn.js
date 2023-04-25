import React, {useContext, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { getUser} from '../utils/getUser'

const FollowBtn = ({ ngo }) => {
  const [disabled, setDisabled] = useState(false)
  const { user, setUser } = useContext
  (AuthContext);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const res = await axios.post(
        `http://localhost:5000/api/user/${user._id}/follow/ngo`,        
        { 
          follow: `${ngo.name}`
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
      setDisabled('Following...')
      await getUser(user._id, setUser);
      } catch (e) {
        console.log(e);
      }
    }

  return (
    <div>
      <button disabled={disabled} className="follow" onClick={handleFollow}>
        {(user.following).find(item => item===ngo.name) ? `Following` : `Follow ${ngo.name}`}
      </button>
    </div>
  )
}

export default FollowBtn