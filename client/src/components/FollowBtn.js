import React, {useContext, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { getUser} from '../utils/getUser'

const FollowBtn = ({ ngo }) => {
  const [clicked, setClicked] = useState()
  const [disabled, setDisabled] = useState(false)
  const { user, setUser } = useContext(AuthContext);

  const handleFollow = async () => {
    setClicked(!clicked)
    setDisabled(true)

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
      await getUser(user._id, setUser);


      // How to only display NGOS that aren't followed yet?
      } catch (e) {
        console.log(e);
      }
    }

  return (
    <div>
      <button disabled={disabled} className="follow" onClick={handleFollow}>{clicked ? 'Following...' : `Follow ${ngo.name}`}</button>

      {/* <button disabled={disabled} className="follow" onClick={handleFollow} style={{ display: clicked ? 'none' : `block`}}>Follow {ngo.name}</button> */}
    </div>
  )
}

export default FollowBtn