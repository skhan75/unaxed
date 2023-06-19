import React, { useRef, useState } from "react";
import Alert from "./Alert";
import { useAuth } from "../contexts/AuthContext";

export const ForgotPassword: React.FC<any> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const { resetPassword } = useAuth();
    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true)
        try {
            if (emailRef.current) {
                const email = emailRef.current.value;
                await resetPassword(email);
                setMessage('Check your inbox for further instructions!');
            }
        } catch (error: any) {
            setError('Failed to reset password! ' + error.code);
        }
        setLoading(false);
    };

    return (
        <>
            <h2>Forgot Password?</h2>
            <form className="forgot-password-form">
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                {error && <Alert variant="error" message={error} />}
                {message && <Alert variant="success" message={message} />}
                <button disabled={loading} type="button" onClick={handleSubmit}>
                    Reset Password
                </button>
            </form>
            <div className="forgot-password">
                <a className="forgot-password-link" href="/login">Sign in </a>
            </div>
        </>
    )
}