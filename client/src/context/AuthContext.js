import { createContext, useState, useEffect, useContext} from 'react';
import { auth } from '../firebase';

// Create a new user based on email and password 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({  children }) => {
  const [user, setUser] = useState(null);

  // Listen for authentication state changes with onAuthStateChanged functon and update user state with the setUser function
  useEffect(() => {
    const currentUser = auth.onAuthStateChanged((authUser) => {
      setUser(authUser)
    })
    return currentUser
  }, [])

  // Register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  const logout = (email, password) => {
    return signOut();
  }

  // Updating Email
  const updateUserEmail = (user, email) => {
    // return updateEmail(user, email)
  }

  // Updating Password
  const updateUserPassword = (user, password) => {
    // return updatePassword(user, password)
  }

  // Forgot Password
  const forgotPassword = (email) => { 
    // return sendPasswordResetEmail(auth, email) 

  } 

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserEmail, updateUserPassword, forgotPassword, register }}>
      {children}
    </AuthContext.Provider>  
  );

}
 

