import React, { useEffect, useState } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { getDateForUser, updateUserData } from '../firebase';
import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import JustText from './JustText';
import { JustLineSeparator } from './JustLineSeparator';

export const UserProfile: React.FC<any> = (props) => {
    const { user } = useAuth();
    const [userData, setUserData] = useState<DocumentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
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

    const handleSaveProfile = async() => {
        // Update the user data with the form values
        setUserData((prevData) => ({
            ...prevData,
            experience: {
                current: {
                    company: formValues.company,
                    location: formValues.location,
                },
            },
            website: formValues.website,
            bio: formValues.bio,
        }));
        
        // Save the data to the database
        const updatedData = {
            ...formValues
        }
        
        await updateUserData(updatedData, user);
        setEditMode(false);
    };

    useEffect(() => {
        const fetchDataForUser = async (user: User) => {
            try {
                const data = await getDateForUser(user);
                setUserData(data || null); 
                setIsLoading(false);
                setFormValues({
                    company: data?.experience?.current?.company || '',
                    location: data?.experience?.current?.location || '',
                    website: data?.website || '',
                    bio: data?.bio || '',
                });
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
                                <div className="username">{`@${userData?.username}`}</div>
                                {editMode ? (
                                    <textarea
                                        name="bio"
                                        value={formValues.bio}
                                        onChange={handleInputChange}
                                        placeholder="Enter your bio"
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
                            <button onClick={handleEditProfile}>Edit Profile</button>
                            <div className="info-section">
                                {editMode ? (
                                    <>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formValues.company}
                                            onChange={handleInputChange}
                                            placeholder="Company"
                                        />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formValues.location}
                                            onChange={handleInputChange}
                                            placeholder="Location"
                                        />
                                        <input
                                            type="text"
                                            name="website"
                                            value={formValues.website}
                                            onChange={handleInputChange}
                                            placeholder="Website"
                                        />
                                        <div className="edit-profile-btns">
                                            <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                                            <button className="save-btn" onClick={handleSaveProfile}>Save</button>
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
                
            </div>
            <div className="column wide">Column 2</div>
        </div>

    );

}