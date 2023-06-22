import React, { useState } from 'react';
import { Binoculars } from '@styled-icons/boxicons-solid';
import { FolderOpen } from '@styled-icons/fa-regular';
import { Users } from '@styled-icons/fa-solid';
import { RemoveRedEye } from '@styled-icons/material';
import { Verified } from '@styled-icons/material-outlined';


const UserProfileContent: React.FC<any> = ({ user, userProfileData, isUserProfile }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const handleTabChange = (tab) => setActiveTab(tab);

    return (
        <div className="user-profile-content">
            <div className="profile-navbar-group">
                <div className="profile-nav-bar">
                    <div className="profile-nav-bar-item">
                        <div className="profile-nav-bar-item-head">
                            <button
                                className="profile-nav-tab"
                                onClick={() => handleTabChange('overview')}
                            >
                                <Binoculars size="18" className="nav-icon" />
                                Overview
                            </button>
                        </div>   
                        <div className={`profile-nav-bar-item-foot ${activeTab === 'overview' ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                    <div className="profile-nav-bar-item">
                        <div className="profile-nav-bar-item-head">
                            <button
                                className="profile-nav-tab"
                                onClick={() => handleTabChange('projects')}
                            >
                                <FolderOpen size="18" className="nav-icon" />
                                Projects
                            </button>
                        </div>
                        <div className={`profile-nav-bar-item-foot ${activeTab === 'projects' ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                    <div className="profile-nav-bar-item">
                        <div className="profile-nav-bar-item-head">
                            <button
                                className="profile-nav-tab"
                                onClick={() => handleTabChange('vouches')}
                            >
                                <Verified size="18" className="nav-icon" />
                                Vouches
                            </button>
                        </div>
                        <div className={`profile-nav-bar-item-foot ${activeTab === 'vouches' ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                    <div className="profile-nav-bar-item">
                        <div className="profile-nav-bar-item-head">
                            <button
                                className="profile-nav-tab"
                                onClick={() => handleTabChange('collaborations')}
                            >
                                <Users size="18" className="nav-icon" />
                                Collaborations
                            </button>
                        </div>
                        <div className={`profile-nav-bar-item-foot ${activeTab === 'collaborations' ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                    <div className="profile-nav-bar-item">
                        <div className="profile-nav-bar-item-head">
                            <button
                                className="profile-nav-tab"
                                onClick={() => handleTabChange('watchlist')}
                            >
                                <RemoveRedEye size={18} className="nav-icon" />
                                Watch List
                            </button>
                        </div>
                        <div className={`profile-nav-bar-item-foot ${activeTab === 'watchlist' ? 'active' : ''}`}>
                            <span className="line"></span>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="tab-content">
                {activeTab === 'overview' && <div>Overview Content</div>}
                {activeTab === 'projects' && <div>Projects Content</div>}
                {activeTab === 'vouches' && <div>Vouches Content</div>}
                {activeTab === 'collaborations' && <div>Collaborations Content</div>}
                {activeTab === 'watchlist' && <div>Watch List Content</div>}
            </div>
        </div>
    );
}

export default UserProfileContent;