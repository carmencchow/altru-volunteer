import React, { createContext, useEffect, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  setNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }, [notification]);

  const myStyle = {
    position: "absolute",
    top: "0",
    right: "0",
    margin: "1rem",
    padding: "1rem",
    color: "blue",
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {notification && (
        <div className="notification" style={myStyle}>
          <p>{notification}</p>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};
