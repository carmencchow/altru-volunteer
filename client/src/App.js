// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import Info from './pages/Info';
import Home from './pages/Home';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar user={user}/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/info" element={<Info/>}/>
        </Routes>
        {/* <ChatWindow/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
