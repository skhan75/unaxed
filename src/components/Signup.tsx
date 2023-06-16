import React, { useRef, useState } from "react";
import Alert  from "./Alert";
import { useAuth } from "../contexts/AuthContext";
// import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css";


export const Signup: React.FC<any> = (props) => {
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const { signup } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignup = async(e: any) => {
        e.preventDefault();
        setError('');
        
        try {
            if (emailRef.current && passwordRef.current && passwordConfirmationRef.current) {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                const passwordConfirmation = passwordConfirmationRef.current.value;
                
                if(password !== passwordConfirmation) {
                    setError('Passwords do not match');
                    return;
                }
                await signup(email, password);
            }
        } catch (error) {
            setError('Failed to create an account');
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
                <button disabled={loading} type="button" onClick={handleSignup}>
                    Sign up
                </button>
            </form>
            <div>
                Already have an account? <a href="/login">Sign in</a>
            </div>
        </>
    )
}