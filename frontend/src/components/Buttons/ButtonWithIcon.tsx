import React from 'react';
import './buttons-styles.css';

interface ButtonWithIconProps {
    title: string;
    icon: JSX.Element;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    isActive?: boolean;
}

const ButtonWithIcon: React.FC<any> = ({
    title,
    icon,
    iconPosition = 'left',
    onClick,
    isActive = false,
}) => {
    return (
        <button
            className={`button-with-icon${isActive ? ' active' : ''}`}
            onClick={onClick}
        >
            {iconPosition === 'left' && icon}
            <span className="button-with-icon__title">{title}</span>
            {iconPosition === 'right' && icon}
        </button>
    );
};

export default ButtonWithIcon;
