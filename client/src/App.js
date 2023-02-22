import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import Home from './pages/Home';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
          <Route path="/main" element={user ? <Main/> : <Navigate to="/login" />}/>
        </Routes>
        <ChatWindow/>
      </div>
    </BrowserRouter>
  );
}

export default App;
