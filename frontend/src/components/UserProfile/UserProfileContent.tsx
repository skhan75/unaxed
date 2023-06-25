import React, { useEffect, useState } from 'react';
import { Binoculars } from '@styled-icons/boxicons-solid';
import { FolderOpen } from '@styled-icons/fa-regular';
import { Users } from '@styled-icons/fa-solid';
import { RemoveRedEye } from '@styled-icons/material';
import { Verified } from '@styled-icons/material-outlined';
import Followers from '../Social/Followers';
import Collaborations from '../Contents/Collaborations';
import Overview from '../Contents/Overview';
import Projects from '../Contents/Projects';
import Vouches from '../Contents/Vouches';
import WatchList from '../Contents/WatchList';
import Following from '../Social/Following';
import Posts from '../Contents/Posts';


const UserProfileContent: React.FC<any> = ({ 
    user, userProfileData, isUserProfile, showFollowers, setShowFollowers, activeTab 
}) => {
    const tabsComponents = {
        overview: <Overview />,
        projects: <Projects />,
        posts: <Posts />,
        vouches: <Vouches />,
        collaborations: <Collaborations />,
        watchlist: <WatchList />,
        followers: <Followers />,
        following: <Following />
    };

    const SelectedComponent = tabsComponents[activeTab];
    
    return (
        <div className="tab-content">
            {SelectedComponent}
        </div>
    )
}

export default UserProfileContent;