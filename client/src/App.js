import './App.css';
import Main from './pages/Main';
// import Navbar from '../components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FiltersProvider } from './context/FiltersContext';
import { DonationsProvider } from './context/DonationsContext';
import { NgosProvider } from './context/NgosContext';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const user = true;
  return (
    <NgosProvider> 
      <BrowserRouter>
        
        <AuthContextProvider>
        <DonationsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/info/:id" element={<Info/>}/>
          </Routes>
        </div>
        </DonationsProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
