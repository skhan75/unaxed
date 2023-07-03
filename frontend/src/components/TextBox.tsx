import React, { useState } from 'react';
import './seemore.css';

const TextBox = ({ content, maxLength }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const truncatedContent = content.substring(0, maxLength);
    const shouldShowSeeMore = content.length > maxLength;

    const handleSeeMore = () => {
        setShowFullContent(true);
    };

    const handleShowLess = () => {
        setShowFullContent(false);
    };

    return (
        <div>
            {showFullContent ? (
                <div className="see-more-container">
                    {content}
                    <button className="see-more" onClick={handleShowLess}>show less</button>
                </div>
            ) : (
                <div className="see-more-container">
                    {truncatedContent}
                    {shouldShowSeeMore && <button className="see-more" onClick={handleSeeMore}>see more..</button>}
                </div>
            )}
        </div>
    );
};

export default TextBox;
