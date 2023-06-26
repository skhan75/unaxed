import React, { useEffect, useState } from 'react';
import { followUser, getDataForUserByUserId, getFollowersByUserId, getFollowingByUserId, unfollowUser, updateUserData, uploadProfileImage } from '../../firebase';
import { FaBuilding, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaEnvelope, FaHandHoldingHeart, FaUserPlus } from 'react-icons/fa';
import UserAvatar from '../UserAvatar';
import JustText from '../JustText';
import JustLineSeparator from '../JustLineSeparator';
import { ThumbsUp } from '@styled-icons/fa-solid';
import { useUser } from '../../contexts/UserContext';
import './users-styles.css';
import { DocumentData } from 'firebase/firestore';

const UserProfileInfo: React.FC<any> = ({ 
    user, 
    viewedEntity,
    primaryEntity,
    setViewedEntity,
    setPrimaryEntity,
    setActiveTab, 
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState({
        company: viewedEntity?.data.experience?.current?.company || '',
        location: viewedEntity?.data.current?.location || '',
        website: viewedEntity?.data.website || '',
        bio: viewedEntity?.data.bio || '',
    });
    const [ shouldFollow, setShouldFollow ] = useState<boolean>(true);
    const [ isPrimaryAndViewedEntitySame, setIsPrimaryAndViewedEntitySame ] = useState<boolean>(false);
    const [ basicInfoData, setBasicInfoData ] = useState<DocumentData | null>(null);
    const [ followersCount, setFollowersCount] = useState<number>(0);
    const [ followingCount, setFollowingCount ] = useState<number>(0);
    const [ primaryEntFollowersData, setPrimaryEntFollowersData ] = useState<DocumentData | null>(null);
    const [ primaryEntFollowingData, setPrimaryEntFollowingData ] = useState<DocumentData | null>(null);
    const [ viewedEntFollowersData, setViewedEntFollowersData ] = useState<DocumentData | null>(null);
    const [ viewedEntFollowingData, setViewedEntFollowingData ] = useState<DocumentData | null>(null);

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

        const updatedViewedEntity = {
            id: viewedEntity?.id,
            data: {
                ...viewedEntity?.data,
                bio: formValues.bio,
                company: formValues.company,
                location: formValues.location,
                website: formValues.website,
            },
        };

        setViewedEntity(updatedViewedEntity);
    };

    const handleFollow = async() => {
        try {
            setShouldFollow(false);
            await followUser(primaryEntity, viewedEntity);
        } catch (error) {
            setShouldFollow(true);
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async() => {
        try {
            setShouldFollow(true);
            await unfollowUser(primaryEntity, viewedEntity);
        } catch (error) {
            setShouldFollow(false);
            console.error('Error unfollowing user:', error);
        }
    };

    const renderFollowersTab = () => {
        setActiveTab('followers');
    }

    const renderFollowingTab = () => {
        setActiveTab('following');
    }

    useEffect(() => {
        const fetchDataForEntities = async () => {
            try {
                const isPrimaryAndViewedEntitySame = primaryEntity?.id === viewedEntity?.id;
                setIsLoading(true);
                setIsPrimaryAndViewedEntitySame(isPrimaryAndViewedEntitySame);
                
                // Basic Info matters only for the currently viewed profile
                const basicInfoData = viewedEntity?.data;

                if(!isPrimaryAndViewedEntitySame) {
                    const [ primaryEntFollowersData, primaryEntFollowingData ] = await Promise.all([
                        getFollowersByUserId(primaryEntity?.id),
                        getFollowingByUserId(primaryEntity?.id),
                    ]);
                    setPrimaryEntFollowersData(primaryEntFollowersData || null);
                    setPrimaryEntFollowingData(primaryEntFollowingData || null);

                    if (primaryEntFollowersData) {
                        setFollowersCount(Object.keys(primaryEntFollowersData).length);
                    }

                    if (primaryEntFollowingData) {
                        // Check if the viewed profile is not auth/primary user's profile 
                        // i.e viewed profile is a public profile
                        const doesPrimaryUserFollowViewingProfile = !primaryEntFollowingData[basicInfoData?.userId];
                        setShouldFollow(doesPrimaryUserFollowViewingProfile);
                    }
                } 
                
                const [viewedEntFollowersData, viewedEntFollowingData] = await Promise.all([
                    getFollowersByUserId(viewedEntity?.id),
                    getFollowingByUserId(viewedEntity?.id),
                ]);

                setViewedEntFollowersData(viewedEntFollowersData || null);
                setViewedEntFollowingData(viewedEntFollowingData || null);

                if (viewedEntFollowersData) {
                    setFollowersCount(Object.keys(viewedEntFollowersData).length);
                }

                if (viewedEntFollowingData) {
                    setFollowingCount(Object.keys(viewedEntFollowingData).length);
                }
       
                setBasicInfoData(basicInfoData || null);
                setFormValues({
                    company: basicInfoData?.experience?.current?.company || '',
                    location: basicInfoData?.experience?.current?.location || '',
                    website: basicInfoData?.website || '',
                    bio: basicInfoData?.bio || '',
                });

                setIsLoading(false);
            } catch (error) {
                console.error('Error retrieving user data:', error);
                setIsLoading(false);
            }
        };
        if (viewedEntity && primaryEntity) {
            fetchDataForEntities();
        }
    }, [viewedEntity, primaryEntity]);


    return (
        <>
            {!isLoading && (
                <div className="profile-info-container">
                    <div className="profile-avatar-container">
                        <UserAvatar
                            firstName={basicInfoData?.firstName}
                            lastName={basicInfoData?.lastName}
                            size={300}
                            profileImageUrl={basicInfoData?.profileImageUrl || undefined}
                            className="profile-avatar"
                        />
                    </div>
                    <div className="info-top">
                        {(editMode && isPrimaryAndViewedEntitySame) && (
                            <div className="image-upload">
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        )}
                        <div className="profile-info">
                            <div className="name">{`${basicInfoData?.firstName} ${basicInfoData?.lastName}`}</div>
                            <div className="username">{`@${basicInfoData?.username}`}</div>
                            {(editMode && isPrimaryAndViewedEntitySame) ? (
                                <textarea
                                    name="bio"
                                    value={formValues.bio}
                                    onChange={handleInputChange}
                                    placeholder="Enter your bio"
                                    className="bio-edit"
                                />
                            ) : (
                                    <div className="bio">{basicInfoData?.bio}</div>
                            )}
                        </div>
                    </div>
                    <div className="info-bottom">
                        <div className="followers-following-container">
                            <div className="followers-container">
                                <div className="user-stats">
                                    <span className="count">{basicInfoData?.stars || 0}</span>
                                    <span className="label">Stars</span>
                                </div> 
                            </div>
                            <div className="followers-container">
                                <div className="user-stats" onClick={renderFollowersTab}>
                                    <span className="count">{followersCount || 0}</span>
                                    <span className="label">Followers</span>
                                </div>
                            </div>
                            <div className="following-container">
                                <div className="user-stats" onClick={renderFollowingTab}>
                                    <span className="count">{followingCount || 0}</span>
                                    <span className="label">Following</span>
                                </div>
                            </div>
                        </div>
                        {isPrimaryAndViewedEntitySame ? (
                            <button className="profile-btn edit-btn" onClick={handleEditProfile}>
                                Edit Profile
                            </button>
                        ) : (
                                <div className="public-profile-btns-container">
                                    {shouldFollow ? (
                                        <button
                                            className="profile-btn follow-btn follow"
                                            onClick={handleFollow}
                                        >
                                            <FaUserPlus className="button-icon" size={16} />
                                            Follow
                                        </button>
                                    ) : (
                                            <button
                                                className="profile-btn follow-btn unfollow"
                                                onClick={handleUnfollow}
                                            >
                                                <FaUserPlus className="button-icon" size={16} />
                                                Unfollow
                                            </button>
                                    )}
                                   
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
                                        {basicInfoData?.experience?.current?.company && (
                                            <div className="company">
                                                <FaBuilding className="icon" />
                                                {basicInfoData?.experience?.current?.company || ''}
                                            </div>
                                        )}
                                        {basicInfoData?.experience?.current?.location && (
                                            <div className="location">
                                                <FaMapMarkerAlt className="icon" />
                                                {basicInfoData?.experience?.current?.location}
                                            </div>
                                        )}
                                        {basicInfoData?.website && (
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
                                {basicInfoData?.email}
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