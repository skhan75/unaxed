import React from 'react';
import { Signup } from '../components/Signup';
import { Login } from '../components/Login';

const AuthPage: React.FC<any> = (props) => {
    return (
        <div className="login-container">
            <div className="login-box">
                {props.type === 'login' ? <Login />  : <Signup />}
            </div>
        </div>
    )
};

export default AuthPage;