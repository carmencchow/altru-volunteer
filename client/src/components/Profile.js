import React, { useState } from 'react'
import { GrFormClose } from "react-icons/gr";
import { BsPencil } from 'react-icons/bs'
import './Profile.css'

const Profile = () => {
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ telephone, setTelephone ] = useState('')
  const [ formState, setFormState ] = useState('')
  const [ goal, setGoal ] = useState(0)
  const [ modal, setModal ] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleGoalAmount = (e) => {
    console.log('Donation goal: ', e.target.value)
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

      <button onClick={toggleModal}
        className="modal-btn">Your Profile
      </button> 

      {modal && (        
        <div className="profile-drawer" onClick={toggleModal}>
          <p>My Profile</p>
          <div className="my-profile">
            <p className="name"></p>
            <button className="edit" onClick={handleEdit}>
              <BsPencil className="edit"/>Edit Profile
            </button>
            <GrFormClose className="close-btn" onClick={toggleModal}/>
              
            <input 
              type="text" 
              className="goal-amount" 
              placeholder="Donation amount" 
              value={goal}
              onChange={handleGoalAmount}>
            </input>

            <button onClick={saveGoalAmount}>Save</button>

            <form className="form">
              <label htmlFor="firstname">First name:</label>
              <label htmlFor="lastname">Last name:</label>
              <label htmlFor="address">Address:</label>
              <label htmlFor="telephone">Telephone:</label>
              <label htmlFor="email">Email:</label>
            </form>
            
            <div className="favourites">
              <h3>Favourited Organizations</h3>
              <button className="delete">Delete from favorite</button>
            </div>

          </div>
        </div>
       )}
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
