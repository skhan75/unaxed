import React from 'react';

type AlertVariant = 'success' | 'warning' | 'error';

interface AlertProps {
    variant: AlertVariant;
    message: string;
}

const Alert: React.FC<AlertProps> = ({ variant, message }) => {
    let className = '';

    switch (variant) {
        case 'success':
            className = 'alert-success';
            break;
        case 'warning':
            className = 'alert-warning';
            break;
        case 'error':
            className = 'alert-error';
            break;
        default:
            className = 'alert-info';
    }

    return <div className={`alert ${className}`}>{message}</div>;
};

export default Alert;