import React, { useState } from "react";
import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";
import { useUser } from "../contexts/UserContext";


export const Navbar: React.FC<{}> = (props) => {
    const location = useLocation();
    const { userData } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log('userData', userData?.username)
    const handleAvatarClick = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    // Check if the current route is the login page
    const isLoginPage = location.pathname === '/login';

    return (
        <nav className="unaxed-nav">
            <div className="unaxed-main-container nav">
                <div className="unaxed-left-container">
                    <ul>
                        <li>
                            <div className="unaxed-logo">
                                <a href="/" className="site-title">unaxed</a>
                            </div>
                        </li>
                    </ul>
                </div>
                {!isLoginPage && (
                    <div className="unaxed-center-container">
                        {/* TODO */}
                        <li>
                            <SearchBar />
                        </li>
                    </div>
                )}
                <div className="unaxed-right-container">
                    {isLoginPage && (
                        <ul>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </ul>
                    )}
                    {!isLoginPage && (
                        <ul>
                            <li>
                                <div className="user-avatar-nav-wrapper" onClick={handleAvatarClick}>
                                    <UserAvatar
                                        firstName={userData?.firstName}
                                        lastName={userData?.lastName}
                                        profileImageUrl={userData?.profileImageUrl}
                                        size={38}
                                    />
                                    {(userData?.username && isDropdownOpen) && (
                                        <div className="profile-dropdown">
                                            <ul className="profile-dropdown-items">
                                                <li className="profile-item">
                                                    <Link to={`/${userData?.username}`}>Profile</Link>
                                                </li>
                                                <li className="profile-item">
                                                    <Link to="/settings">Settings</Link>
                                                </li>
                                                <li className="profile-item">
                                                    <Link to="/logout">Logout</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}