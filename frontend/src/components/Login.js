import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";
import axios from '../utils/axios'; // Adjust the path based on your folder structure


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Use the login function from context
            alert("Logged in successfully!");
            navigate("/");
        } catch (err) {
            setError("Login failed. Please try again.");
        }
    };
}

export default Login;
