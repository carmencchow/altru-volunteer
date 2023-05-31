import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const currentUser = JSON.stringify(localStorage.getItem("user"));

  //   if (currentUser === null) {
  //     navigate("/");
  //   } else {
  //     setUser(currentUser);
  //   }
  // }, []);

  // const signUp = async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     const userCredentials = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     res.status(200).json({ userCredentials });
  //     return userCredentials;
  //   } catch (error) {
  //     res.status(400).send({ message: error });
  //     console.log("Firebase Error", error);
  //   }
  // };

  const signUp = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredentials;
    } catch (error) {
      console.log("Firebase Error", error);
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

  const googleSignIn = async () => {};

  const profile = async (name, email, password) => {
    try {
      const getProfile = await updateProfile(auth.currentUser, {
        displayName: name,
      });
      console.log(getProfile);
      return getProfile;
    } catch (err) {
      console.log(err);
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
  }, []);

  useEffect(() => {
    handleToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        profile,
        signIn,
        signUp,
        handleSignOut,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
