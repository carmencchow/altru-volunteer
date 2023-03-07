// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  const user = true;
  return (
    <BrowserRouter>
      <div>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/main" element={<Main/>}/>
            {/* <Route path="/main" element={<ProtectedRoute><Main/></ProtectedRoute>}/> */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/info" element={<Info/>}/>
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
