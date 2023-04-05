import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import './ProfileInfo.css'

const Profile = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ telephone, setTelephone ] = useState('')

  const handleEdit = () => {
      



    console.log('editing')
  }

  return (
    
    <div>  
      <div className="edit-row">      
        <p>Carmen Chow</p>
        <p>reach.cchow@gmail.com</p>
        <BsPencil onClick={handleEdit} className="edit"/>Edit
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


/* CRUD
* Profile information
- Edit profile: contact and image

* Donation information
- Edit savings goal
- History of donations made

* Volunteer information
- Update favorites list
- History of volunteer activities

EXTRA
- Schema: 
- see other users
*/
