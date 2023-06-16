import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

// Create the AuthContext
interface AuthContextType {
    user: User | null;
    signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook to access the AuthContext
export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};


// Create the AuthProvider component
export const AuthProvider: React.FC<any> = ({ children }) => {
    { console.log("HERE") }
    const [user, setUser] = useState<User | null>(null);

    // Firebase login function
    const signup = async (email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User:', response);
            // setUser(response.user);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    // Check if the user is already logged in (e.g., on page refresh)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: React.SetStateAction<User | null>) => {
            if(user) {
                console.log("USER", user)
                setUser(user);
            }
            
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authContextValue: AuthContextType = {
        user,
        signup,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};