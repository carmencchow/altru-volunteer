import './App.css';
import Main from './pages/Main';
// import Navbar from '../components/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Info from './pages/Info';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
import { FiltersProvider } from './context/FiltersContext';
import { NgosProvider } from './context/NgosContext';

function App() {
  // const user = true;

  const { 
    loginWithPopup, 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated 
  } = useAuth0();
 
  return (
    <NgosProvider> 
      <BrowserRouter>
        <div>
          <>
            {/* <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>             */}
            {/* !isAuthenticated ? "Logged in" : "Not logged in" }</h3>
      { isAuthenticated && (
        <pre style={{textAlign: 'start'}}>{JSON.stringify(user, null, 2)}</pre>
      )} */}

          </>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/login" onClick={loginWithRedirect} element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/info/:id" element={<Info/>}/>
            {/* <Route path="/login" onClick={logout}element={<Login/>}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </NgosProvider>
  );
}

export default App;
