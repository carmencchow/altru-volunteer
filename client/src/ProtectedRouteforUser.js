import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export const ProtectedRouteforUser = () => {
  const { mongoUser } = useContext(AuthContext);
  if (mongoUser.isOrganizer) {
    // if (!mongoUser || mongoUser.isOrganizer === true) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
};
