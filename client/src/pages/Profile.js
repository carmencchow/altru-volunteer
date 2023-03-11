import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
import './Profile.css'
import { BsPencil } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLirstname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');

  const [formState, setFormState] = useState();
  
  const handleEdit = () => {
    console.log('Edit Profile')
    navigate('/edit')
    setDropdown(!dropdown)
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
            </div>

            <Tabs/>
            
          </div>
        </div>
      )
    }

export default Profile