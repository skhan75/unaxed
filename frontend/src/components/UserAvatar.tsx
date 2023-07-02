import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserAvatarProps {
    firstName?: string;
    lastName?: string;
    size: number;
    profileImageUrl?: string;
    className?: string;
    username?: string; 
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    firstName,
    lastName,
    size,
    profileImageUrl,
    className,
    username,
}) => {
    const getInitials = (firstName: string, lastName: string) => {
        if (!firstName || !lastName) return '';
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    };

    let initials = '';
    if (firstName && lastName) {
        initials = getInitials(firstName, lastName);
    }

    const avatarStyle: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Math.floor(size / 2.5),
        fontWeight: 'bold',
        color: '#fff',
        cursor: 'pointer', // Add cursor pointer
    };

    const imageStyle: React.CSSProperties = {
        ...avatarStyle,
        objectFit: 'cover',
    };

    const navigate = useNavigate();
    const handleAvatarClick = () => {
        if (username) {
            navigate(`/${username}`, { replace: false });
        }
    };

    return (
        <div className={className} style={avatarStyle} onClick={handleAvatarClick}>
            {profileImageUrl ? (
                <img
                    className="profile-avatar"
                    src={profileImageUrl}
                    alt="User Avatar"
                    style={imageStyle}
                />
            ) : (
                initials
            )}
        </div>
    );
};

export default UserAvatar;
