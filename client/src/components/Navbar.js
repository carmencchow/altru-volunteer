import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/altru.png";
import "./Navbar.css";
// import { api } from "../utils/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleSignOut } = useContext(AuthContext);
  // const [data, setData] = useState(null);

  // const fetchProtectedData = async () => {
  //   const token = await user.getIdToken();
  //   const res = await api.get("/", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(data);
  //   setData(res.data);
  // };
  // useEffect(() => {
  //   fetchProtectedData();
  // }, []);

  const navMain = () => {
    navigate("/volunteer");
  };

  const navProfile = () => {
    navigate("/profile");
  };

  return (
    <nav>
      <div className="navbar">
        <img className="logo" onClick={navMain} src={logo} alt="logo" />
        <div className="navbar-right">
          <div className="profile-btn" onClick={navProfile}>
            {user && <p>{user.email}</p>}
          </div>
          <div className="logout-btn" onClick={handleSignOut}>
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
