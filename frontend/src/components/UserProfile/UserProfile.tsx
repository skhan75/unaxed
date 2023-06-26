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
    const { 
        userData: authUserData, 
        setViewedEntityData, 
        viewedEntityData, 
        viewedEntity, 
        primaryEntity, 
        setViewedEntity, 
        setPrimaryEntity 
    } = useUser();
    const { user } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isAuthUserProfile, setIsAuthUserProfile] = React.useState<boolean>(true);
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            if(!user?.uid) {
                throw new Error('User not found');
            }
            if (username && username !== authUserData?.username) {
                setIsAuthUserProfile(false);
                const data = await getDataForUserByUsername(username);
                if(!data) {
                    throw new Error('User Data not found for username: ' + username);
                }
                const viewedEntity = {
                    id: data?.userId,
                    data: data,
                }
                setViewedEntity(viewedEntity || null);
                setViewedEntityData(data || null);
            } else {
                const primaryEntity = {
                    id: user?.uid,
                    data: authUserData,
                };
                setViewedEntity(primaryEntity || null);
                setViewedEntityData(authUserData || null);
            }
            setLoading(false);
        };

        fetchUserProfile();
    }, [username, authUserData, user, setViewedEntityData]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        navigate(`?tab=${tabId}`);
    };

    return (
        <>  
            {!loading && (
                <div className="profile-page-container">
                    <div className="profile-page-sub-container">
                        <div className="column slim">
                            <UserProfileInfo
                                user={user}
                                viewedEntity={viewedEntity}
                                primaryEntity={primaryEntity}
                                setViewedEntity={setViewedEntity}
                                setPrimaryEntity={setPrimaryEntity}
                                setUserProfileData={setViewedEntityData}
                                isAuthUserProfile={isAuthUserProfile}
                                setActiveTab={handleTabChange}
                            />
                        </div>
                        <div className="column wide">
                            <div className="user-profile-col-1">
                                <div className="user-profile-content">
                                    <UserProfileHeaderTabs
                                        isAuthUserProfile={isAuthUserProfile}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                        handleTabChange={handleTabChange}
                                    />
                                    <UserProfileContent
                                        user={user}
                                        activeTab={activeTab}
                                    />
                                </div>
                            </div>
                            <div className="user-profile-col-2">
                            </div>
                        </div>
                    </div>
                </div>
            )}  
        </>
    );
};
