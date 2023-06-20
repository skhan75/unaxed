import React from "react";
import { Form } from "react-bootstrap";
import { BsFillChatLeftDotsFill, BsFillGearFill, BsFillBellFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Avatar } from "./Avatar";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";


export const Navbar: React.FC<{}> = (props) => {
    const location = useLocation();

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
                    <div className="bubbles-center-container">
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
                            <IconContext.Provider value={{ color: "#915eff", className: "bubbles-icons" }}>
                                <li>
                                    Right Items
                                </li>
                            </IconContext.Provider>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}