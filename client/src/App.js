// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import Info from './pages/Info';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext';

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div>
        {/* <UserAuthContextProvider> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/main" element={<Main/>}/>
          {/* <Route path="/main" element={<ProtectedRoute><Main/></ProtectedRoute>}/> */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/info" element={<Info/>}/>
        </Routes>
        {/* </UserAuthContextProvider> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
