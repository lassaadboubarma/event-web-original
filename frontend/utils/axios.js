// src/utils/axios.js
import axios from 'axios';

// Set the base URL and allow credentials (cookies)
axios.defaults.baseURL = 'http://localhost:5000';  // Replace with your backend URL
axios.defaults.withCredentials = true;  // Include credentials (cookies) in requests

export default axios;
