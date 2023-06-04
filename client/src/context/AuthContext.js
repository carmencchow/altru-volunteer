import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
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

  const verifyUser = async (token) => {
    const data = await axios.post(
      "http://localhost:5000/api/auth/verifyUser",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.status === 401) {
      navigate("/signup");
      return false;
    }
    return true;
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        const isVerified = await verifyUser(token);
        if (isVerified) {
          setUser(currentUser);
        }
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
        signIn,
        signUp,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
