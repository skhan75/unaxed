import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';
import NewProfileInformationPage from './pages/NewProfileInformationPage';

function App() {
  return (
    <div className='main-container'>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path='/login' element={<AuthPage type='login' />} />
            <Route path='/signup' element={<AuthPage type='signup' />} />
            <Route path='/forgot-password' element={<AuthPage type='forgot' />} />
            <Route path='/create-profile' element={<PrivateRoute><NewProfileInformationPage /></PrivateRoute>} />
            <Route path='/logout' element={<Dashboard />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
            
           
           
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
