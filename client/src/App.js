import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DonationsProvider } from './context/DonationsContext';
import { AuthContextProvider } from './context/AuthContext';
import { FiltersProvider } from './context/FiltersContext';
import { NgosProvider } from './context/NgosContext';
import Volunteer from './components/Volunteer';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Info from './pages/Info';
import './App.css';

function App() {
  return (
    <NgosProvider> 
      <BrowserRouter>
        <AuthContextProvider>
          <FiltersProvider>
            <DonationsProvider>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/volunteer" element={<Volunteer/>}/>
                <Route path="/info/:id" element={<Info/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/edit" element={<Edit/>}/>
              </Routes>
              <Footer/>
            </DonationsProvider>
          </FiltersProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
