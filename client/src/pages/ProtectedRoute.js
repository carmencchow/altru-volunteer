import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  let { user } = useAuth(); //invoke function to get user object
  if(user){
    return <>{children}</>
  }
  return <Navigate to="/login"/>; 

}

export default ProtectedRoute