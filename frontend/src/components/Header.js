import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Header.css";

const Header = () => {
    const { token, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/events" className="nav-link">Events</Link>
                <Link to="/create-event" className="nav-link">Create Event</Link>
                {token ? (
                    <button className="nav-link" onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
