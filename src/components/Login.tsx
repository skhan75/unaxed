import React, { useRef, useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { addFieldsToCollection } from "../firebase";

export const Login: React.FC<any> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            if (emailRef.current && passwordRef.current) {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                await login(email, password);
                navigate('/');
            }
        } catch (error: any) {
            setError('Failed to sign in! ' + error.code);
        }
        setLoading(false);
    };

    return (
        <>
            <h2>Sign In</h2>
            <form className="signup-form">
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
                <div className="forgot-password">
                    <a className="forgot-password-link" href="/forgot-password">Forgot Password? </a>
                </div>
                {error && <Alert variant="error" message={error} />}
                <button disabled={loading} type="button" onClick={handleSubmit}>
                   Sign in
                </button>
            </form>
            <div>
                Need an account? <a href="/signup">Sign up</a>
            </div>
        </>
    )
}