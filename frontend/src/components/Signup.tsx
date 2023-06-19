import React, { useRef, useState } from "react";
import Alert  from "./Alert";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";


export const Signup: React.FC<any> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const { signup } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            if (emailRef.current && passwordRef.current && passwordConfirmationRef.current) {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                const passwordConfirmation = passwordConfirmationRef.current.value;
                
                if(password !== passwordConfirmation) {
                    setError('Passwords do not match !');
                    return;
                }
                await signup(email, password);

                navigate('/create-profile');
            }
        } catch (error: any) {
            setError('Failed to create an account. ' + error.code);
        }
        setLoading(false);
    };

    return (
        <>
            <h2>Sign Up</h2>
            <form className="signup-form">
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
                <label>Confirm Password</label>
                <input type="password" ref={passwordConfirmationRef} required />
                {error && <Alert variant="error" message={error} />}
                <button disabled={loading} type="button" onClick={handleSubmit}>
                    Sign up
                </button>
            </form>
            <div>
                Already have an account? <a href="/login">Sign in</a>
            </div>
        </>
    )
}