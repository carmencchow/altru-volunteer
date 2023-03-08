import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
import './Profile.css'
import { BsPencil } from 'react-icons/bs'

const Profile = () => {
  const [dropdown, setDropdown] = useState(false);
  
  const handleEdit = () => {
    console.log('Edit Profile')
    setDropdown(!dropdown)
  }
  
  return (
    <div>
      <Navbar/>



    <div className="container">

      <div className="user-profile">
        <p>My Profile</p>
        <div className="my-profile">
          <p className="name"></p>
          <button className="edit" onClick={handleEdit}><BsPencil className="edit"  />Edit Profile</button>

          <form className="form">
            
          </form>

        </div>
      </div>

      {/*------ Section 2: -------*/}
      <div className="favourites">
        <h3>Favourited Organizations</h3>
      </div>


      <Tabs/>
      
    </div>
    </div>
  )
}

export default Profile