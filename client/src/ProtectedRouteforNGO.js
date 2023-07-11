import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

export const ProtectedRouteforNGO = () => {
  const { mongoUser } = useContext(AuthContext);
  if (mongoUser && mongoUser.isOrganizer) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
