import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import { history } from '_helpers';

const PrivateRoute: React.FC<any> = ({ ...children }) => {
    const { user } = useAuth();
    
    if(!user) {
        return <Navigate to="/login" />;
    }
    return <Outlet/>
};

export default PrivateRoute;