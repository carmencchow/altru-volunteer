import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
  const logout = () => {
    return signOut(auth);
  }

  // Google Sign In
  const googleSignIn = (email, password) => {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
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

  // Delete User
  // const deleteUser = (user) => {
  //   .then(() => {
  //     // User deleted
  // }).catch((err) => {
  //   console.log(err);
  // })

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserEmail, updateUserPassword, googleSignIn, forgotPassword, register }}>
      {children}
    </AuthContext.Provider>  
  );
  
}
 

