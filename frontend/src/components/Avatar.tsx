import React from "react";


export const Avatar: React.FC<any> = (props) => {
    return (
        <div className="unaxed-profile-icon-container">
            <div>
                <img className="unaxed-profile-avatar" src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="profile" />
            </div>
            {/* <div className="bubbles-profile-icon-arrow">
                <i className="arrow down"></i>
            </div>  */}
            <i></i>
        </div>
    )
}