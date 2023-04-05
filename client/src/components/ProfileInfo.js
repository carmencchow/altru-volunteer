import React, { useState } from 'react'
import { GrFormClose } from "react-icons/gr";
import { BsPencil } from 'react-icons/bs'
import './Profile.css'

const Profile = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ telephone, setTelephone ] = useState('')
  const [ goal, setGoal ] = useState(0)

  const handleGoalAmount = (e) => {
    setGoal(e.target.value)
  }

  const saveGoalAmount = (e) => {
    console.log('Saving amount', goal)
  }

  const handleEdit = () => {
    console.log('editing')
  }

  return (
    
    <div>  
      <p>Name:</p>
      <p>Email:</p>
      <button className="edit" onClick={handleEdit}>
      <BsPencil className="edit"/>Edit</button>
        
      <input 
        type="text" 
        className="goal-amount" 
        placeholder="Donation amount" 
        value={goal}
        onChange={handleGoalAmount}>
      </input>

      <button onClick={saveGoalAmount}>Save</button>

      <div className="favourites">
        <h3>Favourited Organizations</h3>
        <button className="delete">Delete from favorite</button>
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
