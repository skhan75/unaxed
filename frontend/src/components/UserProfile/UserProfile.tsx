import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserProfileInfo from './UserProfileInfo';
import UserProfileContent from './UserProfileContent';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { getDataForUserByUsername } from '../../firebase';
import { DocumentData } from 'firebase/firestore';
import UserProfileHeaderTabs from './UserProfileHeaderTabs';

export const UserProfile: React.FC<any> = () => {
    const { username } = useParams();
    const { userData: authUserData } = useUser();
    const { user } = useAuth();
    const [viewProfileData, setViewProfileData] = useState<DocumentData | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isAuthUserProfile, setIsAuthserProfile] = React.useState<boolean>(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

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
        if (username !== authUserData?.username) {
            setIsAuthserProfile(false);
        }
        fetchUserProfile();
    }, [username, authUserData]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        navigate(`?tab=${tabId}`);
    };

    return (
        <>  
            {!loading && (
                <div className="profile-page-container">
                    <div className="column slim">
                        <UserProfileInfo 
                            user={user}
                            userProfileData={viewProfileData} 
                            isAuthUserProfile={isAuthUserProfile} 
                            setActiveTab={handleTabChange}
                        />
                    </div>
                    <div className="column wide">
                        <div className="user-profile-content">
                            <UserProfileHeaderTabs
                                isAuthUserProfile={isAuthUserProfile}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleTabChange={handleTabChange}
                            />
                            <UserProfileContent
                                user={user}
                                userProfileData={viewProfileData}
                                activeTab={activeTab}
                            />
                        </div>
                    </div>
                </div>
            )}  
        </>
    );
};
