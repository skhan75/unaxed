import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { updateUserData, uploadProfileImage } from '../firebase';
import { FaBuilding, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import UserAvatar from './UserAvatar';
import JustText from './JustText';
import JustLineSeparator from './JustLineSeparator';


const UserProfileInfo: React.FC<any> = ({ user, userProfileData, isUserProfile }) => {
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formValues, setFormValues] = useState({
        company: userData?.experience?.current?.company || '',
        location: userData?.experience?.current?.location || '',
        website: userData?.website || '',
        bio: userData?.bio || '',
    });

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
        setUserData((prevData) => ({
            ...prevData,
            ...updatedData,
        }));

        await updateUserData(updatedData, user);
        setEditMode(false);
    };

    useEffect(() => {
        const fetchDataForUser = async () => {
            try {
                setUserData(userProfileData || null);
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
        }
    }, [user]);
    return (
        <>
            {!isLoading && (
                <div className="profile-info-container">
                    <div className="profile-avatar-container">
                        <UserAvatar
                            firstName={userData?.firstName}
                            lastName={userData?.lastName}
                            size={300}
                            profileImageUrl={userData?.profileImageUrl || undefined}
                            className="profile-avatar"
                        />
                    </div>
                    
                    <div className="info-top">

                        {editMode && (
                            <div className="image-upload">
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                        )}
                        <div className="profile-info">
                            <div className="name">{`${userData?.firstName} ${userData?.lastName}`}</div>
                            <div className="username">{`@${userData?.username}`}</div>
                            {editMode ? (
                                <textarea
                                    name="bio"
                                    value={formValues.bio}
                                    onChange={handleInputChange}
                                    placeholder="Enter your bio"
                                    className="bio-edit"
                                />
                            ) : (
                                <div className="bio">{userData?.bio}</div>
                            )}
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
                        <button className="edit-profile-btn" onClick={handleEditProfile}>Edit Profile</button>
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