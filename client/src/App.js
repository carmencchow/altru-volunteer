import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DonationsProvider } from './context/DonationsContext';
import { AuthContextProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { FiltersProvider } from './context/FiltersContext';
import { NgosProvider } from './context/NgosContext';
import Volunteer from './components/Volunteer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Info from './pages/Info';
import './App.css';

function App() {
  return (
    <NgosProvider> 
      <BrowserRouter>
      {/* <UserProvider> */}
        <AuthContextProvider>
          <FiltersProvider>
            <DonationsProvider>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                {/* <Route path="/login" element={user ? <Navigate to="/main"/> : <Login/>}/> */}
                <Route path="/volunteer" element={<Volunteer/>}/>
                <Route path="/info/:id" element={<Info/>}/>
              </Routes>
            </DonationsProvider>
          </FiltersProvider>
        </AuthContextProvider>
        {/* </UserProvider> */}
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
