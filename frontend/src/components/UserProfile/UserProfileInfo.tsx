import React, { useEffect, useState } from 'react';
import { updateUserData, uploadProfileImage } from '../../firebase';
import { FaBuilding, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaEnvelope, FaHandHoldingHeart, FaUserPlus } from 'react-icons/fa';
import UserAvatar from '../UserAvatar';
import JustText from '../JustText';
import JustLineSeparator from '../JustLineSeparator';
import { ThumbsUp } from '@styled-icons/fa-solid';
import './users-styles.css';

const UserProfileInfo: React.FC<any> = ({ user, userProfileData, isAuthUserProfile, setActiveTab }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState({
        company: userProfileData?.experience?.current?.company || '',
        location: userProfileData?.experience?.current?.location || '',
        website: userProfileData?.website || '',
        bio: userProfileData?.bio || '',
    });
    const [ shouldFollow, setShouldFollow ] = useState<boolean>(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleEditProfile = () => {
        setEditMode(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        const updatedData = {
            ...formValues,
            experience: {
                current: {
                    company: formValues.company,
                    location: formValues.location,
                },
            },
            website: formValues.website,
            bio: formValues.bio,
        };

        if (imageFile) {
            const imageUrl = await uploadProfileImage(imageFile, user);
            Object.assign(updatedData, { profileImageUrl: imageUrl });
        }

        await updateUserData(updatedData, user);
        setEditMode(false);
    };

    const handleFollow = () => {
        console.log('Follow');
    };

    const renderFollowersTab = () => {
        console.log("Followers")
        setActiveTab('followers');
    }

    useEffect(() => {
        const fetchDataForUser = async () => {
            try {
                setIsLoading(false);
                setFormValues({
                    company: userProfileData?.experience?.current?.company || '',
                    location: userProfileData?.experience?.current?.location || '',
                    website: userProfileData?.website || '',
                    bio: userProfileData?.bio || '',
                });
            } catch (error) {
                console.error('Error retrieving user data:', error);
                setIsLoading(false);
            }
        };
        if (user) {
            setIsLoading(true);
            fetchDataForUser();
            if (!isAuthUserProfile && userProfileData?.followers) {
                setShouldFollow(!userProfileData?.followers[user?.uid]);
            } else {
                setShouldFollow(true);
            }
        }
    }, [user]);
    return (
        <>
            {!isLoading && (
                <div className="profile-info-container">
                    <div className="profile-avatar-container">
                        <UserAvatar
                            firstName={userProfileData?.firstName}
                            lastName={userProfileData?.lastName}
                            size={300}
                            profileImageUrl={userProfileData?.profileImageUrl || undefined}
                            className="profile-avatar"
                        />
                    </div>
                    <div className="info-top">
                        {(editMode && isAuthUserProfile) && (
                            <div className="image-upload">
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        )}
                        <div className="profile-info">
                            <div className="name">{`${userProfileData?.firstName} ${userProfileData?.lastName}`}</div>
                            <div className="username">{`@${userProfileData?.username}`}</div>
                            {(editMode && isAuthUserProfile) ? (
                                <textarea
                                    name="bio"
                                    value={formValues.bio}
                                    onChange={handleInputChange}
                                    placeholder="Enter your bio"
                                    className="bio-edit"
                                />
                            ) : (
                                    <div className="bio">{userProfileData?.bio}</div>
                            )}
                        </div>
                    </div>
                    <div className="info-bottom">
                        <div className="followers-following-container">
                            <div className="followers-container">
                                <div className="user-stats">
                                    <span className="count">{userProfileData?.stars || 0}</span>
                                    <span className="label">Stars</span>
                                </div> 
                            </div>
                            <div className="followers-container">
                                <div className="user-stats" onClick={renderFollowersTab}>
                                    <span className="count">{userProfileData?.followersCount || 0}</span>
                                    <span className="label">Followers</span>
                                </div>
                            </div>
                            <div className="following-container">
                                <div className="user-stats">
                                    <span className="count">{userProfileData?.followingCount || 0}</span>
                                    <span className="label">Following</span>
                                </div>
                            </div>
                        </div>
                        {isAuthUserProfile ? (
                            <button className="profile-btn edit-btn" onClick={handleEditProfile}>
                                Edit Profile
                            </button>
                        ) : (
                                <div className="public-profile-btns-container">
                                    <button 
                                        className={
                                            `profile-btn follow-btn ${shouldFollow ? 'follow' : 'unfollow'}`
                                        } 
                                        onClick={handleFollow}
                                    >
                                        <FaUserPlus className="button-icon" size={16}/>
                                        {shouldFollow ? 'Follow' : 'Unfollow'}
                                    </button>
                                    <button className="profile-btn vouch-btn" onClick={handleFollow}>
                                        <ThumbsUp className="button-icon" size={16} />
                                        
                                        Vouch
                                    </button>
                                    <button className="profile-btn sponsor-btn" onClick={handleFollow}>
                                        <FaHandHoldingHeart className="button-icon" size={16} />
                                        Sponsor
                                    </button>
                                </div>
                        )}
                        <div className="info-section">
                            {editMode ? (
                                <>
                                    <div className="input-container">
                                        <FaBuilding className="icon" />
                                        <input
                                            type="text"
                                            name="company"
                                            value={formValues.company}
                                            onChange={handleInputChange}
                                            placeholder="Company"
                                            className="edit-profile-input"
                                        />
                                    </div>
                                    <div className="input-container">
                                        <FaMapMarkerAlt className="icon" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formValues.location}
                                            onChange={handleInputChange}
                                            placeholder="Location"
                                            className="edit-profile-input"
                                        />
                                    </div>
                                    <div className="input-container">
                                        <FaLink className="icon" />
                                        <input
                                            type="text"
                                            name="website"
                                            value={formValues.website}
                                            onChange={handleInputChange}
                                            placeholder="Website"
                                            className="edit-profile-input"
                                        />
                                    </div>
                                    <div className="edit-profile-btns">
                                        <button className="save-btn" onClick={handleSaveProfile}>Save</button>
                                        <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        {userProfileData?.experience?.current?.company && (
                                            <div className="company">
                                                <FaBuilding className="icon" />
                                                {userProfileData?.experience?.current?.company || ''}
                                            </div>
                                        )}
                                        {userProfileData?.experience?.current?.location && (
                                            <div className="location">
                                                <FaMapMarkerAlt className="icon" />
                                                {userProfileData?.experience?.current?.location}
                                            </div>
                                        )}
                                        {userProfileData?.website && (
                                            <div className="website">
                                                <FaLink className="icon" />
                                                Website
                                            </div>
                                        )}

                                    </>
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
                        <JustLineSeparator style={{ width: "100%" }} />
                        <JustText text="Achievements" size="medium" />
                        <JustLineSeparator style={{ width: "100%" }} />
                        <JustText text="Top Skills" size="medium" />
                        <JustLineSeparator style={{ width: "100%" }} />
                        <JustText text="Recent Collaborations" size="medium" />
                    </div>
                </div>
            )}
        </>
    );
}

export default UserProfileInfo;