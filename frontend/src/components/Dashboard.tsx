import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<any> = () => {
    const [ error, setError ] = React.useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async() => {
        console.log('logout');
        try {
            await logout();
            navigate('/home');
        } catch(e) {
            setError('Failed to logout. ' + e.code);
        }
    }

    return (
        <>
            Hello
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
};

export default Dashboard;