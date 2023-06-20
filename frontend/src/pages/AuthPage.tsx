import React from 'react';
import { Signup } from '../components/Signup';
import { Login } from '../components/Login';
import { ForgotPassword } from '../components/ForgotPassword';

const renderSwitch = (type: any) => {
    switch (type) {
        case 'login':
            return <Login />
        case 'signup':
            return <Signup />
        case 'forgot':
            return <ForgotPassword />
        default:
            return <Login />
    }
}

const AuthPage: React.FC<any> = (props) => {
    return (
        <div className="auth-page-container">
            <div className="auth-box-container">
                <div className="auth-box">
                    {
                        renderSwitch(props.type)
                    }
                </div>
            </div>
        </div>
    )
};

export default AuthPage;