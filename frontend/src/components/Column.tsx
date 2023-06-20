import React from 'react';
// import './styles.css'; // Import the CSS file for styles

const Column: React.FC<any> = ({ children, slim, wide }) => {
    const columnClassName = `column ${slim ? 'slim' : ''} ${wide ? 'wide' : ''}`;

    return (
        <div className={columnClassName}>
            {children}
        </div>
    );
};

export default Column;