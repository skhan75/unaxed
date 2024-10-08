import React from 'react';

const JustText: React.FC<any> = (props) => {
    return (
        <>
            <div className={`just-text ${props.size}-font`}>
                {props.text}
            </div>
        </>
    )
};

export default JustText;