import React from 'react';
import './buttons-styles.css';

interface ButtonWithIconProps {
    title: string;
    icon: JSX.Element;
    iconPosition?: 'left' | 'right';
    onClick?: () => void;
    isActive?: boolean;
    secondary?: boolean;
    className?: string;
}

const ButtonWithIcon: React.FC<any> = ({
    title,
    icon,
    iconPosition = 'left',
    onClick,
    secondary=false,
    primary=true,
    isActive=false,
    className,
}) => {
    return (
        <button
            className={ className? className: `button-with-icon ${secondary ? 'secondary' : 'primary'}` }
            onClick={onClick}
        >   
            {iconPosition === 'left' && icon}
            <span className="button-with-icon__title">{title}</span>
            {iconPosition === 'right' && icon}
        </button>
    );
};

export default ButtonWithIcon;
