import React from 'react';
// import './App.css';
import { Signup } from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Login } from './components/Login';
import NewProfileInformationPage from './pages/NewProfileInformationPage';

function App() {
  return (
    <div className='main-container'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<AuthPage type='login' />} />
            <Route path='/signup' element={<AuthPage type='signup'/>} />
            <Route path='/forgot-password' element={<AuthPage type='forgot' />} />
            <Route path='/create-profile' element={<NewProfileInformationPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
