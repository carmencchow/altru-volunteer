import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DonationsProvider } from './context/DonationsContext';
import { AuthContextProvider } from './context/AuthContext';
import { FiltersProvider } from './context/FiltersContext';
import { NgosProvider } from './context/NgosContext';
import Volunteer from './components/Volunteer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Info from './pages/Info';
import './App.css';

function App() {
  // const user = true;
  return (
    <NgosProvider> 
      <BrowserRouter>
        <AuthContextProvider>
          <FiltersProvider>
            <DonationsProvider>
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                {/* <Route path="/login" element={user ? <Navigate to="/main"/> : <Login/>}/> */}
                <Route path="/main" element={<Volunteer/>}/>
                <Route path="/info/:id" element={<Info/>}/>
              </Routes>
            </DonationsProvider>
          </FiltersProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
