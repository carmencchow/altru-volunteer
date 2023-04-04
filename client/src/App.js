import './App.css';
import Main from './pages/Main';
// import Navbar from '../components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Donate from './components/Donate';
import Volunteer from './components/Volunteer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DonationsProvider } from './context/DonationsContext';
import { FiltersProvider } from './context/FiltersContext';
import { NgosProvider } from './context/NgosContext';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  const user = true;
  return (
    <NgosProvider> 
      <BrowserRouter>
        <AuthContextProvider>
          <FiltersProvider>
        <DonationsProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/donate" element={<Donate/>}/>
            <Route path="/volunteer" element={<Volunteer/>}/>
            <Route path="/info/:id" element={<Info/>}/>
          </Routes>
        </div>
        </DonationsProvider>
        </FiltersProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
