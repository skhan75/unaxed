import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-heading">404 Not Found</h1>
            <p className="not-found-message">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;