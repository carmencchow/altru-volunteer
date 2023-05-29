import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredentials;
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredentials;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    console.log("logging out...");
    await signOut(auth);
  };

  const handleToken = async () => {
    if (user) {
      const token = await user.getIdToken();
      setToken(token);
    } else {
      setToken("");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    // return unsubscribe()
  }, []);

  useEffect(() => {
    handleToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signUp, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
