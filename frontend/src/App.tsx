import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import NewProfileInformationPage from './pages/NewProfileInformationPage';
import { Navbar } from './components/Navbar';
import { UserProfile } from './components/UserProfile';

function App() {
  return (
    <div className='main-container'>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className='pages-container'>
            <Routes>
              <Route path='/login' element={<AuthPage type='login' />} />
              <Route path='/signup' element={<AuthPage type='signup' />} />
              <Route path='/forgot-password' element={<AuthPage type='forgot' />} />
              <Route path='/create-profile' element={<NewProfileInformationPage />} />
              <Route path='/logout' element={<Dashboard />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/home" element={<Dashboard />} />
                {/* <Route path=":username" element={<UserProfile />} /> */}
                <Route path="/profile" element={<UserProfile />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
