import React from 'react';
import NewUser from '../components/NewUser';


const NewProfileInformationPage: React.FC<any> = (props) => {
    return (
        <div className="new-profile-container">
            <div className="new-profile-box">
                <NewUser />
            </div>
        </div>
    )
};

export default NewProfileInformationPage;