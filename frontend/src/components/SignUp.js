import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { Link } from 'react-router-dom';

import './SignUp.css';  

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                email,
                password,
            });

            if (response.status === 201) {
                navigate('/login'); // Redirect to login page on successful signup
            }
        } catch (err) {
            setError('Error signing up! Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <Link to="/" className="home-button">Home</Link> {/* Home Button */}
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
