import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ForgotPassword = () => {
  const { login, forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    await forgotPassword(email).then((res) => {
      console.log(res)
      setSuccess('Check your email for a new password')
    }).catch((err) => {
      setError(err.message)
      console.log(err.message)
    })
  }

  return (
    <div>

      {success && <div><strong>Success:</strong>{success}</div>}
      {error && <div><strong>Error:</strong>{error}</div>}

      <form noValidate onSubmit={handleSubmit}>
        <input
          type="email"
          label="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>

      <div>
        <p>Return to Login</p>
        <Link to="/login">Login</Link>
      </div>

    </div>
  )
}

export default ForgotPassword