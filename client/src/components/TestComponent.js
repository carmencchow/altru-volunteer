import React, {useContext, useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const TestComponent = () => {
  const { userId, user } = useContext(AuthContext);
  const [display, setDisplay] = useState(null)

  const handleFetchData = async () => {
    console.log('Fetching user data from server')
      console.log(user.email, user, user._id)  
      const res = await axios.get(`http://localhost:5000/api/user/${userId}`)
      const data = res.data;
      console.log('User 1:', data)
      setDisplay(data.user)
    }

  return (
    <div>
      <h1>User details</h1>
      <div>
        <button onClick={handleFetchData}>Get Data</button>
        <h3>Show User Details: {display}</h3>
        <h3>{JSON.stringify(display)}</h3>
      </div>
    </div>
  )
}

export default TestComponent