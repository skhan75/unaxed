import React from 'react';
import './modal.css';

const Card = ({ title, description }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Card;