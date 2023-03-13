import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type){
    case 'LOGIN':
      // Return new piece of state - object with user property equal to what the payload returns on the action from the server
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      // If no changes, return the original state
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  console.log('AuthContext state: ', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}