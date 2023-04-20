import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, firstname, lastname, password) => {
    setIsLoading(true)
    setError(null)

    // POST request to 'signup' endpoint
    const response = await axios.get('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({ email, firstname, lastname,  password })
    })
    const json = await response.json()

    if (!response.ok){
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok){
      // Save user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }

}