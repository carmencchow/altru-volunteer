import React, {useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

const TestComponent = () => {
  const { userId, user } = useContext(AuthContext);

  const handleFetchData = async () => {
    console.log('Fetching user data from server')
      console.log(user.email, user, user._id)  
      const res = await axios.delete(`http://localhost:5000/api/user/${userId}`)
      console.log(res)
    }

  return (
    <div>
      <h1>User details</h1>
      <div>
        <button onClick={handleFetchData}>Get Data</button>
      </div>
    </div>
  )
}

export default TestComponent