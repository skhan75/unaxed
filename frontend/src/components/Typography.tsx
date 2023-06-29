import React, { ReactNode } from 'react';
import './typography.css';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'subtitle';
    component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    children: ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
    variant,
    component = 'span',
    children
}) => {
    const Component = component;

    let className = '';

    switch (variant) {
        case 'h1':
            className = 'heading-1';
            break;
        case 'h2':
            className = 'heading-2';
            break;
        case 'h3':
            className = 'heading-3';
            break;
        case 'h4':
            className = 'heading-4';
            break;
        case 'h5':
            className = 'heading-5';
            break;
        case 'h6':
            className = 'heading-6';
            break;
        case 'body':
            className = 'body';
            break;
        case 'caption':
            className = 'caption';
            break;
        case 'subtitle':
            className = 'subtitle';
            break;
        default:
            className = '';
    }

    return (
        <Component className={className}>
            {children}
        </Component>
    );
};

export default Typography;