import React, { useEffect } from 'react';
import { Binoculars } from '@styled-icons/boxicons-solid';
import { FolderOpen } from '@styled-icons/fa-regular';
import { Users } from '@styled-icons/fa-solid';
import { RemoveRedEye } from '@styled-icons/material';
import { useLocation } from 'react-router-dom';
import { RiArticleLine } from 'react-icons/ri';
import { ThumbUp } from '@styled-icons/material';

const UserProfileHeaderTabs: React.FC<any> = ({
    activeTab,
    setActiveTab,
    handleTabChange
}) => {
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabId = searchParams.get('tab');

        if (tabId && tabId !== activeTab) {
            setActiveTab(tabId);
        }
    }, [location.search, activeTab, setActiveTab]);

    const tabs = [
        { id: 'overview', label: 'Overview', show: true, icon: <Binoculars size="18" className="nav-icon" /> },
        { id: 'posts', label: 'Posts', show: true, icon: <RiArticleLine size={18} className="nav-icon" /> },
        { id: 'projects', label: 'Projects', show: true, icon: <FolderOpen size="18" className="nav-icon" /> },
        { id: 'vouches', label: 'Vouches', show: true, icon: <ThumbUp size="18" className="nav-icon" /> },
        { id: 'collaborations', label: 'Collaborations', show: true, icon: <Users size="18" className="nav-icon" /> },
        { id: 'watchlist', label: 'Watch List', show: true, icon: <RemoveRedEye size={18} className="nav-icon" /> },
        { id: 'followers', label: 'Followers', show: false },
        { id: 'following', label: 'Following', show: false },
    ];

    return (
        <div className="profile-navbar-group">
            <div className="profile-nav-bar">
                {tabs.map((tab) => (
                    <div className="profile-nav-bar-item" key={tab.id}>
                        <div className="profile-nav-bar-item-head">
                            {tab.show && (
                                <button className="profile-nav-tab" onClick={() => handleTabChange(tab.id)}>
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            )}
                        </div>
                        <div className={`profile-nav-bar-item-foot ${activeTab === tab.id ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfileHeaderTabs;
