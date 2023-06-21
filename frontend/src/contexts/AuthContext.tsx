import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, isUsernameAvailable } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
 } from "firebase/auth";
import { User } from "firebase/auth";

// Create the AuthContext
interface AuthContextType {
    user: User | null;
    signup: (email: string, password: string) => Promise<User | null>;
    login: (email: string, password: string) => Promise<User | null>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
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

export const AuthProvider: React.FC<any> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)

    const signup = async (email: string, password: string) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user;
    };

    const login = async (email: string, password: string) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    }

    const resetPassword = async (email: string) => {
        const response = await sendPasswordResetEmail(auth, email);
    }

    const logout = async () => {
        await signOut(auth);
    }

    // Check if the user is already logged in (e.g., on page refresh)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: React.SetStateAction<User | null>) => {
            setUser(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    const authContextValue: AuthContextType = {
        user,
        signup,
        login,
        resetPassword,
        logout
    };

    return <AuthContext.Provider value={authContextValue}>{!loading && children}</AuthContext.Provider>;
};