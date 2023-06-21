import React from 'react';

interface UserAvatarProps {
    firstName: string;
    lastName: string;
    size: number;
    profileImageUrl?: string;
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    firstName,
    lastName,
    size,
    profileImageUrl,
    className,
}) => {
    const getInitials = (firstName: string, lastName: string) => {
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        return firstInitial + lastInitial;
    };

    const initials = getInitials(firstName, lastName);

    const avatarStyle = {
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
    };

    return (
        <div className={className} style={avatarStyle}>
            {profileImageUrl ? (
                <img
                    className="profile-avatar"
                    src={profileImageUrl}
                    alt="User Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                initials
            )}
        </div>
    );
};

export default UserAvatar;