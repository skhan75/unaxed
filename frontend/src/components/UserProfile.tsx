import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserProfileInfo from './UserProfileInfo';
import UserProfileContent from './UserProfileContent';

export const UserProfile: React.FC<any> = (props) => {
    const { user } = useAuth();

    return (
        <div className="profile-page-container">
            <div className="column slim">
                <UserProfileInfo />
            </div>
            <div className="column wide">
                <UserProfileContent />
            </div>
        </div>
    );
}