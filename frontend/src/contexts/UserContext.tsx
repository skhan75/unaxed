import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDataForUser, getFollowers, getFollowing, updateUserData } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import { DocumentData } from 'firebase/firestore';

interface UserContextType {
    userData: DocumentData | null;
    // setUserData: (data: UserDataInterface | null) => void;
}

const UserContext = createContext<UserContextType | undefined | null>(undefined);

// Create a custom hook to access the AuthContext
export const useUser = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('useUSer must be used within an UserProvider');
    }
    return userContext;
};

export const UserProvider: React.FC<any> = ({ children }) => {
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true)
    const { user } = useAuth();

    // Fetch user data here one time for all childs
    useEffect(() => {
        const fetchAndUpdateUserData = async () => {
            try {
                setLoading(true);
                const userData = await getDataForUser(user);
                const followersData = await getFollowers(user);
                const followingData = await getFollowing(user);
                const updatedUserData = {
                    ...userData,
                    fullName: userData?.firstName + ' ' + userData?.lastName,
                    followers: followersData || {},
                    followersCount: followersData ? Object.keys(followersData).length : 0,
                    following: followingData || {},
                    followingCount: followingData ? Object.keys(followingData).length : 0,
                };
                setUserData(updatedUserData || null);
                await updateUserData(updatedUserData, user);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving user data:', error);
                setLoading(false);
            }
        };
        fetchAndUpdateUserData();
    }, []);

    const userContextValue: UserContextType = {
        userData
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {!loading && children}
        </UserContext.Provider>
    );
};

export default UserContext;
