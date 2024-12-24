import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
    });

    // Check if the user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/verify", {
                    withCredentials: true, // Send cookies with the request
                });
                setAuth({ isAuthenticated: true });
            } catch (err) {
                setAuth({ isAuthenticated: false });
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        await axios.post("http://localhost:5000/api/users/login", { email, password }, { withCredentials: true });
        setAuth({ isAuthenticated: true });
    };

    const logout = async () => {
        await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
        setAuth({ isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
