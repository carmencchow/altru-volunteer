import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
import './Profile.css'
import { BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [dropdown, setDropdown] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLirstname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [telephone, setTelephone] = useState('')
  const [goalAmount, setGoalAmount] = useState('$0')
  const [formState, setFormState] = useState('')
  const navigate = useNavigate()
  
  const handleEdit = () => {
    console.log('Edit Profile')
    navigate('/edit')
    setDropdown(!dropdown)
  }

  const handleGoalAmount = (e) => {
    console.log('Donation goal: ', e.target.value)
    setGoalAmount(e.target.value)
  }

  const saveGoalAmount = (e) => {
    console.log('Saving amount', e.target.value)
  }

  return (
    <div>
      <Navbar/>
        <div className="container">
          <span className="back" onClick={() => navigate(-1)}>Back</span>
            <div className="user-profile">
              <p>My Profile</p>

              <div className="my-profile">
                <p className="name"></p>
                <button className="edit" onClick={handleEdit}><BsPencil className="edit"/>Edit Profile</button>

                {/* <h2>Goal Amount is {goalAmount}</h2> */}

                <input 
                  type="text" 
                  className="goal-amount" 
                  placeholder="$Donation amount" 
                  value={goalAmount}
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

              </div>
            </div>


            <div className="favourites">
              <h3>Favourited Organizations</h3>
              <button className="delete">Delete from favorite</button>
            </div>

            <Tabs/>
            
          </div>
        </div>
      )
    }

export default Profile