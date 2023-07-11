import { Navigate, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { FiltersProvider } from "./context/FiltersContext";
import { NgosProvider } from "./context/NgosContext";
import { ProtectedRouteforUser } from "./ProtectedRouteforUser";
import { ProtectedRouteforNGO } from "./ProtectedRouteforNGO";
import UserProfile from "./pages/UserProfile";
import NgoProfile from "./pages/NgoProfile";
import Preview from "./pages/Preview";
import Ngos from "./pages/Ngos";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Ngo from "./pages/Ngo";
import "./App.css";

function App() {
  return (
    <NotificationProvider>
      <AuthContextProvider>
        <NgosProvider>
          <FiltersProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRouteforUser />}>
                <Route path="/ngos" element={<Ngos />} />
                <Route path="/ngo/:id" element={<Ngo />} />
                <Route path="/user/profile" element={<UserProfile />} />
              </Route>

              <Route element={<ProtectedRouteforNGO />}>
                <Route path="/profile" element={<NgoProfile />} />
                <Route path="/preview" element={<Preview />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </FiltersProvider>
        </NgosProvider>
      </AuthContextProvider>
    </NotificationProvider>
  );
}

export default App;
