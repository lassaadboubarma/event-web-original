import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"; // Replace with your backend URL
axios.defaults.withCredentials = true; // Include cookies in requests

export default axios;
