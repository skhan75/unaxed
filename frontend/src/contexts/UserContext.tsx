import React, { createContext, useState, useEffect, useContext } from 'react';
import { getDataForUser, getFollowers, getFollowing, updateUserData } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import { DocumentData } from 'firebase/firestore';
import {UserEnt} from '../interfaces/UserEnt';

interface UserContextType {
    userData: DocumentData;
    viewedEntity: UserEnt | null;
    primaryEntity: UserEnt | null;
    viewedEntityData: DocumentData | null;
    setViewedEntityData: (data: DocumentData) => void;
    setUserData: (data: DocumentData) => void;
    setViewedEntity: (entity: UserEnt) => void;
    setPrimaryEntity: (entity: UserEnt) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return userContext;
};

export const UserProvider: React.FC<any> = ({ children }) => {
    const [userData, setUserData] = useState<DocumentData>({});
    const [viewedEntityData, setViewedEntityData] = useState<DocumentData>({});
    const [viewedEntity, setViewedEntity] = useState<UserEnt | null>(null);
    const [primaryEntity, setPrimaryEntity] = useState<UserEnt | null>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAndUpdateUserData = async () => {
            // if(!user || !user.uid) {
            //     throw new Error('User not found');
            // };
            try {
                setLoading(true);
                const userData = await getDataForUser(user);
                if(!userData) {
                    throw new Error('User Data not found for user: ' + user?.uid);
                };
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
                setUserData(userData);
                const entity: UserEnt = {
                    id: user?.uid,
                    data: updatedUserData,
                };
                setPrimaryEntity(entity);
                setViewedEntity(entity);
                setViewedEntityData(updatedUserData || null);
                // await updateUserData(updatedUserData, user);
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving user data:', error);
                setLoading(false);
            }
        };

        fetchAndUpdateUserData();
    }, [user]);

    const userContextValue: UserContextType = {
        userData,
        viewedEntityData,
        setViewedEntityData,
        setUserData,
        viewedEntity,
        setViewedEntity,
        primaryEntity,
        setPrimaryEntity,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {loading ? <p>Loading...</p> : children}
        </UserContext.Provider>
    );
};

export default UserContext;