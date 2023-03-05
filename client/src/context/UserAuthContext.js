// import { createContext, useState, useEffect, useContext} from 'react';

// // Create a new user based on email and password 
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged
// } from 'firebase/auth';
// import { auth } from '../firebase';

// const userAuthContext = createContext();

// export function UserAuthContextProvider({  children }) {
//   const [user, setUser] = useState('');

//   function signUp(email, password){
//     return createUserWithEmailAndPassword(auth, email, password);
//   }
  
//   function login(email, password){
//     return signInWithEmailAndPassword(auth, email, password);
//   }

//   // Listen for authentication state changes with onAuthStateChanged functon and update user state with the setUser function
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => {
//       unsubscribe();
//     }
//   }, []);
  
//   return <userAuthContext.Provider value={{user, signUp}}>{children}</userAuthContext.Provider>  
  
// }

// // Returns current context value of the userAuthContext. Lets other components access current user state
// export function useUserAuth() {
//   return useContext(userAuthContext);
// }