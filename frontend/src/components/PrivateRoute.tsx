import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { history } from '_helpers';

const PrivateRoute: React.FC<any> = ({ ...children }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    if(!user) {
        // Store the last visited location in local storage
        localStorage.setItem('lastLocation', location.pathname);
        return <Navigate to="/login" />;
    }
    return <Outlet/>
};

export default PrivateRoute;