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
    const nativeClass = `button-with-icon ${secondary ? 'secondary' : 'primary'}`;
    return (
        <button
            className={className ? `${nativeClass} ${className}` : nativeClass }
            onClick={onClick}
        >   
            {iconPosition === 'left' && icon}
            <span className="button-with-icon__title">{title}</span>
            {iconPosition === 'right' && icon}
        </button>
    );
};

export default ButtonWithIcon;
