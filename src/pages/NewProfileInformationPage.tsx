import React from 'react';
import NewUserProfile from '../components/NewUserProfile';


const NewProfileInformationPage: React.FC<any> = (props) => {
    return (
        <div className="new-profile-container">
            <div className="new-profile-box">
                <NewUserProfile />
            </div>
        </div>
    )
};

export default NewProfileInformationPage;