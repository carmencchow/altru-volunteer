import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const currentUser = JSON.stringify(localStorage.getItem("user"));
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser === null) {
      navigate("/");
    } else {
      setUser(currentUser);
    }
  }, []);

  //   if (user === null) {
  //     navigate("/");
  //   } else {
  //     setUser(user);
  //   }
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
