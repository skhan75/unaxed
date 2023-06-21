import React, { useRef, useState } from "react";
import Alert  from "./Alert";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { setUserData, checkUserNameAvailability } from '../firebase';


export const Signup: React.FC<any> = (props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const { signup } = useAuth();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = React.useState<boolean>(false);
    const [isUsernameEmpty, setIsUsernameEmpty] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            if (emailRef.current && passwordRef.current && passwordConfirmationRef.current && usernameRef.current) {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                const passwordConfirmation = passwordConfirmationRef.current.value;
                
                if(password !== passwordConfirmation) {
                    setError('Passwords do not match !');
                    return;
                }

                if (!isUsernameAvailable) {
                    setError('Username is not available!');
                    return;
                }

                const username = usernameRef.current.value;
                const user = await signup(email, password);

                await setUserData({ username, email }, user);
                navigate('/create-profile');
            }
        } catch (error: any) {
            setError('Failed to create an account. ' + error.code);
        }
        setLoading(false);
    };

    const handleCheckUserName = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const username: string = event.target.value;
        setIsUsernameEmpty(username === '');
        try {
            const isAvailable = await checkUserNameAvailability(username);
            setIsUsernameAvailable(isAvailable);
        } catch (error) {
            console.error('Error checking username:', error);
        }
    };

    return (
        <>
            <h2>Sign Up</h2>
            <form className="signup-form">
                <label>Email</label>
                <input type="email" ref={emailRef} required />
                <label>username *</label>
                <input type="text" ref={usernameRef} name="username" required onChange={handleCheckUserName}/>
                <div className="check-username-availabiliy">
                    {!isUsernameEmpty && (
                        isUsernameAvailable ? (
                            <Alert variant="success" message="Username is available!" />
                        ) : (
                            <Alert variant="error" message="Username is not available!" />
                        )
                    )}
                </div>
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
                <label>Confirm Password</label>
                <input type="password" ref={passwordConfirmationRef} required />
                {error && <Alert variant="error" message={error} />}
                <button disabled={loading || (!isUsernameAvailable || isUsernameEmpty)} type="button" onClick={handleSubmit}>
                    Sign up
                </button>
            </form>
            <div>
                Already have an account? <a href="/login">Sign in</a>
            </div>
        </>
    )
}