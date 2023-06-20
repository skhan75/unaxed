import React, { useEffect, useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { getDateForUser } from '../firebase';
import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export const UserProfile: React.FC<any> = (props) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDataForUser = async (user: User) => {
            try {
                const data = await getDateForUser(user);
                setUserData(data || null); 
                setIsLoading(false);
            } catch (error) {
                console.error('Error retrieving user data:', error);
                setIsLoading(false);
            }
        };

        if (user) {
            setIsLoading(true);
            fetchDataForUser(user);
        }
    }, [user]);

    return (
        <div className="profile-page-container">
            <div className="column slim">
                {!isLoading && (
                    <div className="profile-info-container">
                        <div className="info-top">
                            <img className="profile-avatar" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="User Avatar" />

                            <div className="profile-info">
                                <div className="name">{`${userData?.firstName} ${userData?.lastName}`}</div>
                                <div className="username">{userData?.username}</div>
                                <div className="bio">{userData?.bio}</div>
                            </div>
                        </div>
                        <div className="info-bottom">
                            <div className="followers-following-container">
                                <div className="followers-container">
                                    <span className="count">{userData?.stars || 0}</span>
                                    <span className="label">Stars</span>
                                </div>
                                <div className="followers-container">
                                    <span className="count">{userData?.followers || 0}</span>
                                    <span className="label">Followers</span>
                                </div>
                                <div className="following-container">
                                    <span className="count">{userData?.following || 0}</span>
                                    <span className="label">Following</span>
                                </div>
                            </div>
                            <button>Edit Profile</button>
                            {userData?.experience?.current?.company && (
                                <div className="company">
                                    <FaBuilding className="icon" />
                                    {userData?.experience?.current?.company || ''}
                                </div>
                            )}
                            {userData?.experience?.current?.location && (
                                <div className="location">
                                    <FaMapMarkerAlt className="icon" />
                                    {userData?.experience?.current?.location}
                                </div>
                            )}
                            {userData?.website && (
                                <div className="website">
                                    <FaLink className="icon" />
                                    Website
                                </div>
                            )}
                            <div className="joined">
                                <FaCalendarAlt className="icon" />
                                Joined
                            </div>
                            <div className="email">
                                <FaEnvelope className="icon" />
                                {user?.email}
                            </div>

                        </div>

                    </div>
                )}
                
            </div>
            <div className="column wide">Column 2</div>
        </div>

    );

}