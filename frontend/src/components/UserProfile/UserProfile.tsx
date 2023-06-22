import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserProfileInfo from './UserProfileInfo';
import UserProfileContent from './UserProfileContent';
import { useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import NotFound from '../NotFound';
import { getDataForUserByUsername } from '../../firebase';
import { DocumentData } from 'firebase/firestore';

export const UserProfile: React.FC<any> = () => {
    const { username } = useParams();
    const { userData: authUserData } = useUser();
    const { user } = useAuth();
    const [viewProfileData, setViewProfileData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isAuthUserProfile, setIsAuthserProfile] = React.useState<boolean>(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            if (username && username !== authUserData?.username) {
                setViewProfileData(await getDataForUserByUsername(username) || null);
            } else {
                setViewProfileData(authUserData || null);
            }
            setLoading(false);
        }
        // First check if the view profile is the user's profile or other's public profile
        if (username !== authUserData?.username) {
            setIsAuthserProfile(false);
        }
        // Fetch the relavant user data
        fetchUserProfile();
    }, [username, authUserData]);

    return (
        <>  
            {!loading && (
                <div className="profile-page-container">
                    <div className="column slim">
                        <UserProfileInfo 
                            user={user} 
                            userProfileData={viewProfileData} 
                            isAuthUserProfile={isAuthUserProfile} 
                        />
                    </div>
                    <div className="column wide">
                        <UserProfileContent 
                            user={user} 
                            userProfileData={viewProfileData} 
                            isAuthUserProfile={isAuthUserProfile} 
                        />
                    </div>
                </div>
            )}  
        </>
    );
};
