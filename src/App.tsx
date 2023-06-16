import React from 'react';
// import './App.css';
import { Signup } from './components/Signup';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    
    <AuthProvider>
      {console.log("HERE")}
      <div className='main-container'>
        <div className="login-container">
          <div className="login-box">
            <Signup />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
