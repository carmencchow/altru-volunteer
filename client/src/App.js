import { Navigate, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { FiltersProvider } from "./context/FiltersContext";
import { NgosProvider } from "./context/NgosContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Volunteer from "./components/Volunteer";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Info from "./pages/Info";
import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <AuthContextProvider>
        <NgosProvider>
          <FiltersProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/info/:id" element={<Info />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </FiltersProvider>
        </NgosProvider>
      </AuthContextProvider>
    </NotificationProvider>
  );
}

export default App;
