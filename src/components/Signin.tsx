import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css";


export const Signin: React.FC<any> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        // Perform signup logic here, e.g., calling an API or Firebase authentication
        console.log('Email:', email);
        console.log('Password:', password);
        // Reset the form fields
        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className="signup-container">
                <h1>Sign In</h1>
                <form className="signup-form">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={handleSignup}>
                        Sign in
                    </button>
                    <div>
                        New to Unaxed? <a href="/signup">Sign up</a>
                    </div>
                </form>
            </div>
        </>
    )
}