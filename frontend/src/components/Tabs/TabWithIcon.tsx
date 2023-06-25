import React from 'react';
import './tabs-styles.css';

interface TabWithIconProps {
    title: string;
    icon: JSX.Element;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    isActive?: boolean;
    className?: string;
}

const TabWithIcon: React.FC<TabWithIconProps> = ({
    title,
    icon,
    iconPosition = 'left',
    onClick,
    isActive = false,
}) => {
    return (
        <button
            className={`tab-with-icon${isActive ? ' active' : ''}`}
            onClick={onClick}
        >
            {iconPosition === 'left' && icon}
            <span className="tab-with-icon__title">{title}</span>
            {iconPosition === 'right' && icon}
        </button>
    );
};

export default TabWithIcon;
