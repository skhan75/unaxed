import React, { useRef, useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../contexts/AuthContext";
import { FirebaseError } from "firebase/app";


export const Login: React.FC<any> = (props) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { signup } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true)

        try {
            if (emailRef.current && passwordRef.current) {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;

                await signup(email, password);
            }
        } catch (error: any) {
            setError('Failed to create an account. ' + error.code);
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
                {error && <Alert variant="error" message={error} />}
                <button disabled={loading} type="button" onClick={handleSignup}>
                   Sign in
                </button>
            </form>
        </>
    )
}