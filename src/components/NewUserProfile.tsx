import React from 'react';
import { ProfileFormInterface } from '../interfaces/ProfileFormInterface';
import JustText from './JustText';
import Dropdown  from './Dropdown';


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
    const handleDropdownSelect = (selectedValue: string) => {
        console.log('Selected option:', selectedValue);
        // Perform any actions based on the selected option
    };

    return (
        <>
            <h2>Welcome to Unaxed! Tell us something about yourself.</h2>
            <form className="new-profile-form">
                <JustText text="About You"/>
                <label>Full Name *</label>
                <input type="text" name="fullname" required />
                <label>Country/Region *</label>
                <input type="text" name="country" required />
                <label>Postal Code *</label>
                <input type="text" name="postalCode" required />
                <label>City</label>
                <input type="text" name="postalCode" />
                <JustText text="Professional Experience" />
                <label>Title</label>
                <input type="text" name="title" />
                <label>Company</label>
                <input type="text" name="title" />
                <label>Industry</label>
                <Dropdown options={options} onSelect={handleDropdownSelect}/>
                <label>Years of Experience</label>
                <input type="text" name="yoe" />
                <div className="spaced-evenly">
                    <button className="btn-outline" type="submit">Back</button>
                    <button className="btn-primary" type="submit">Next</button>
                </div>
            </form>
        </>
    )
};

export default NewUserProfile;