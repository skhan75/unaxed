import React from 'react';
import { ProfileFormInterface } from '../interfaces/ProfileFormInterface';
import JustText from './JustText';
import Dropdown  from './Dropdown';
import { addFieldsToCollection } from '../firebase';

const options = [
    { value: 'automotive', label: 'Automotive' },
    { value: 'construction', label: 'Construction' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'technology', label: 'Technology' },
    { value: 'retail', label: 'Retail' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'media', label: 'Media' },
    { value: 'telecommunications', label: 'Telecommunications' },
    { value: 'other', label: 'Other' },
];

const NewUserProfile: React.FC<any> = () => {
    const handleSaveData = async () => {
        try {
            await addFieldsToCollection('users', userProfile);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
    const [userProfile, setUserProfile] = React.useState<ProfileFormInterface>({
        firstName: '',
        middleName: '',
        lastName: '',
        country: '',
        city: '',
        postalCode: '',
        experience: {
            current: {
                title: '',
                company: '',
                industry: '',
            },
        },
        education: [],
    });
     
    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const nestedNames = name.split('.');
        let updatedProfile: ProfileFormInterface = { ...userProfile };

        let currentLevel: any = updatedProfile;
        for (let i = 0; i < nestedNames.length; i++) {
            const nestedName = nestedNames[i];
            if (i === nestedNames.length - 1) {
                currentLevel[nestedName] = value;
            } else {
                if (!currentLevel[nestedName]) {
                    currentLevel[nestedName] = {};
                }
                currentLevel = currentLevel[nestedName] as ProfileFormInterface;
            }
        }

        setUserProfile(updatedProfile);
    };
    const handleDropdownSelect = (selectedValue: string) => {
        if(userProfile.experience) {
            setUserProfile({
                ...userProfile,
                experience: {
                    ...userProfile.experience,
                    current: {
                        ...userProfile.experience.current,
                        industry: selectedValue,
                    },
                },
            });
        }
    };

    console.log('userProfile:', userProfile)

    return (
        <>
            <h2>Welcome to Unaxed! Tell us something about yourself.</h2>
            <form className="new-profile-form">
                <JustText text="About You"/>
                <label>First Name *</label>
                <input 
                    type="text" value={userProfile.firstName} name="firstName" required onChange={handleUpdate} 
                />
                <label>Last Name *</label>
                <input 
                    type="text" value={userProfile.lastName} name="lastName" required onChange={handleUpdate} 
                />
                <label>Country/Region *</label>
                <input 
                    type="text" value={userProfile.country} name="country" required onChange={handleUpdate} 
                />
                <label>Postal Code *</label>
                <input 
                    type="text" value={userProfile.postalCode} name="postalCode" required onChange={handleUpdate} 
                />
                <label>City</label>
                <input 
                    type="text" value={userProfile.city} name="city" onChange={handleUpdate} 
                />
                <JustText text="Professional Experience" />
                <label>Title</label>
                <input 
                    type="text" value={userProfile.experience?.current.title} name="experience.current.title" onChange={handleUpdate} 
                />
                <label>Company</label>
                <input 
                    type="text" value={userProfile.experience?.current.company} name="experience.current.company" onChange={handleUpdate} 
                />
                <label>Industry</label>
                <Dropdown options={options} onSelect={handleDropdownSelect}/>
                <label>Years of Experience</label>
                <input 
                    type="text" value={userProfile.experience?.yoe} name="experience.yoe" onChange={handleUpdate} 
                />
                <div className="spaced-evenly">
                    <button className="btn-outline" type="submit">Back</button>
                    <button className="btn-primary" type="submit" onClick={handleSaveData}>Next</button>
                </div>
            </form>
        </>
    )
};

export default NewUserProfile;