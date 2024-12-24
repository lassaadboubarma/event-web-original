import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation buttons at the top-right */}
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button">Sign Up</Link>
        <Link to="/login" className="auth-button">Login</Link>
      </div>

      <h1 className="home-header">Welcome to the Event Polling App</h1>
      <p className="home-subtitle">
        Create and participate in events with ease. Vote, RSVP, and engage with the community.
      </p>

      <div className="navbar">
        <Link to="/events" className="home-button">Event List</Link>
        <Link to="/create-event" className="home-button">Create Event</Link>
      </div>
    </div>
  );
};

export default Home;
